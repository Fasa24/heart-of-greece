
<?php

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    $pdo = conectar();

    /*
    |--------------------------------------------------------------------------
    | GET: consultar platillos
    |--------------------------------------------------------------------------
    */
    if ($method === 'GET') {

        if (isset($_GET['id'])) {
            $id = (int) $_GET['id'];

            if ($id <= 0) {
                responder(['error' => 'Invalid dish ID'], 422);
            }

            $stmt = $pdo->prepare(
                'SELECT id, name, price, description, image
                 FROM productos
                 WHERE id = :id'
            );

            $stmt->execute(['id' => $id]);

            $dish = $stmt->fetch();

            if (!$dish) {
                responder(['error' => 'Dish not found'], 404);
            }

            $dish['id'] = (int) $dish['id'];
            $dish['price'] = (float) $dish['price'];

            responder($dish);
        }

        $stmt = $pdo->query(
            'SELECT id, name, price, description, image
             FROM productos
             ORDER BY id'
        );

        $menu = $stmt->fetchAll();

        foreach ($menu as &$dish) {
            $dish['id'] = (int) $dish['id'];
            $dish['price'] = (float) $dish['price'];
        }

        unset($dish);

        responder($menu);
    }

    /*
    |--------------------------------------------------------------------------
    | POST: crear platillo
    |--------------------------------------------------------------------------
    */
    if ($method === 'POST') {

        $input = leerJson();
        $dish = validarPlatillo($input);

       

        if ($dish['image'] === '') {
            $dish['image'] = '/assets/img/santorini.png';
        }

        $stmt = $pdo->prepare(
            'INSERT INTO productos
                (name, price, description, image)
             VALUES
                (:name, :price, :description, :image)'
        );

        $stmt->execute($dish);

        $dish['id'] = (int) $pdo->lastInsertId();

        responder($dish, 201);
    }


    if ($method === 'PUT') {

        $id = (int) ($_GET['id'] ?? 0);

        if ($id <= 0) {
            responder(['error' => 'Dish ID is required'], 422);
        }

        $input = leerJson();
        $dish = validarPlatillo($input);

        $check = $pdo->prepare(
            'SELECT id FROM productos WHERE id = :id'
        );

        $check->execute(['id' => $id]);

        if (!$check->fetch()) {
            responder(['error' => 'Dish not found'], 404);
        }

        $stmt = $pdo->prepare(
            'UPDATE productos
             SET name = :name,
                 price = :price,
                 description = :description,
                 image = :image
             WHERE id = :id'
        );

        $dish['id'] = $id;

        $stmt->execute($dish);

        responder($dish, 200);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE: eliminar platillo
    |--------------------------------------------------------------------------
    */
    if ($method === 'DELETE') {

        $id = (int) ($_GET['id'] ?? 0);

        if ($id <= 0) {
            responder(['error' => 'Dish ID is required'], 422);
        }

        $stmt = $pdo->prepare(
            'DELETE FROM productos WHERE id = :id'
        );

        $stmt->execute(['id' => $id]);

        if ($stmt->rowCount() === 0) {
            responder(['error' => 'Dish not found'], 404);
        }

        http_response_code(204);
        exit;
    }

    header('Allow: GET, POST, PUT, DELETE');

    responder(['error' => 'Method not allowed'], 405);

} catch (PDOException $e) {

    error_log($e->getMessage());

    responder([
        'error' => 'Database error'
    ], 500);
}
