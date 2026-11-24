<?php

require __DIR__ . '/helpers.php';

$jsonPath = __DIR__ . '/data/menu.json';

if (!file_exists($jsonPath)) {
    $initialMenu = require __DIR__ . '/data/menu.php';
    file_put_contents($jsonPath, json_encode($initialMenu, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$menu = json_decode(file_get_contents($jsonPath), true);
if (!is_array($menu)) {
    $menu = require __DIR__ . '/data/menu.php';
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        $id = (int) $_GET['id'];
        foreach ($menu as $item) {
            if ((int) $item['id'] === $id) {
                responder($item, 200);
            }
        }
        responder(['error' => 'Dish not found'], 404);
    }

    responder($menu, 200);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!is_array($input)) {
        responder(['error' => 'Invalid JSON payload'], 422);
    }

    $name = trim($input['name'] ?? '');
    $price = $input['price'] ?? null;
    $description = trim($input['description'] ?? '');
    $image = trim($input['image'] ?? '');

    if (strlen($name) < 3) {
        responder(['error' => 'Name must be at least 3 characters long'], 422);
    }

    if (!is_numeric($price) || (float) $price <= 0) {
        responder(['error' => 'Price must be a positive number'], 422);
    }

    if (strlen($description) < 5) {
        responder(['error' => 'Description must be at least 5 characters long'], 422);
    }

    if ($image === '') {
        $image = '../assets/img/santorini.png';
    }

    $maxId = 0;
    foreach ($menu as $item) {
        if ((int) $item['id'] > $maxId) {
            $maxId = (int) $item['id'];
        }
    }

    $newDish = [
        'id' => $maxId + 1,
        'name' => $name,
        'price' => (float) $price,
        'description' => $description,
        'image' => $image,
    ];

    $menu[] = $newDish;

    file_put_contents($jsonPath, json_encode($menu, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    responder($newDish, 201);
}

responder(['error' => 'Method not allowed'], 405);