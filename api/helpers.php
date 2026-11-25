
<?php

function responder($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');

    echo json_encode(
        $data,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

    exit;
}

function leerJson(): array {
    $contenido = file_get_contents('php://input');

    $input = json_decode($contenido, true);

    if (json_last_error() !== JSON_ERROR_NONE || !is_array($input)) {
        responder([
            'error' => 'Invalid JSON payload',
            'contenido_recibido' => $contenido,
            'error_json' => json_last_error_msg()
        ], 422);
    }

    return $input;
}

function validarPlatillo(array $input): array {
    $name = trim($input['name'] ?? '');
    $price = $input['price'] ?? null;
    $description = trim($input['description'] ?? '');
    $image = trim($input['image'] ?? '');

    if (strlen($name) < 3) {
        responder([
            'error' => 'Name must be at least 3 characters long'
        ], 422);
    }

    if (!is_numeric($price) || (float) $price <= 0) {
        responder([
            'error' => 'Price must be a positive number'
        ], 422);
    }

    if (strlen($description) < 5) {
        responder([
            'error' => 'Description must be at least 5 characters long'
        ], 422);
    }

    return [
        'name' => $name,
        'price' => (float) $price,
        'description' => $description,
        'image' => $image,
    ];
}
