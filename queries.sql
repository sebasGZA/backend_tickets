--1. Obtener la cantidad de tickets por estado para cada cliente.
SELECT
    C.id AS ClienteId,
    C.name AS Nombre,
    S.name AS Status,
    COUNT(T.id) AS cantidad
FROM
    clients C
    INNER JOIN tickets T ON C.id = T."clientId"
    INNER JOIN statuses S ON T."statusId" = S.id
GROUP BY
    C.id,
    C.name,
    S.name;

--2. Obtener los cinco clientes con mayor cantidad de tickets de prioridad alta o crítica.
SELECT C.id, C.name AS Nombre, COUNT(T.id) AS cantidad
FROM
    clients C
    INNER JOIN tickets T ON C.id = T."clientId"
    INNER JOIN priorities P ON P.id = T."priorityId"
WHERE
    P.name IN ('Alta', 'Critica')
GROUP BY
    C.id,
    C.name
ORDER BY cantidad DESC
LIMIT 5;

-- 3. Tickets con más de 48 horas sin actualización y no cerrados
SELECT T.id, T.title, S.name AS estado, T.updated_At
FROM tickets T
    INNER JOIN statuses S ON T."statusId" = S.id
WHERE
    S.name <> 'Cerrado'
    AND T.updated_At < NOW() - INTERVAL '48 hours';

-- 4. Usuario / Agente con mayor cantidad de tickets resueltos en el último mes
SELECT
    U.id AS usuario_id,
    U.name AS usuario_nombre,
    COUNT(T.id) AS total_resueltos
FROM
    tickets T
    INNER JOIN users U ON T."assignedToId" = U.id
    INNER JOIN statuses S ON T."statusId" = S.id
WHERE
    S.name IN ('Cerrado')
    AND T.updated_at >= NOW() - INTERVAL '1 month'
GROUP BY
    U.id,
    U.name
ORDER BY total_resueltos DESC
LIMIT 1;

-- 5. Tiempo promedio de resolución de tickets por prioridad
SELECT
    P.name AS prioridad,
    AVG(
        T.closed_at - T.created_at
    ) AS tiempo_promedio_resolucion
FROM tickets T
    INNER JOIN priorities P ON T."priorityId" = P.id
WHERE
    T.closed_at IS NOT NULL
GROUP BY
    P.id,
    P.name;

-- 6. Cantidad de tickets abiertos por agente
SELECT
    U.id AS agente_id,
    U.name AS agente,
    COUNT(T.id) AS tickets_abiertos
FROM
    users U
    LEFT JOIN tickets T ON U.id = T."assignedToId"
    INNER JOIN statuses S ON T."statusId" = S.id
    AND S.name NOT IN ('Cerrado')
GROUP BY
    U.id,
    U.name;

-- 7. Tickets reasignados más de dos veces
SELECT
    T.id AS ticket_id,
    T.title,
    COUNT(R.id) AS total_reasignaciones
FROM
    tickets T
    INNER JOIN reassignments R ON T.id = R."ticketId"
GROUP BY
    T.id,
    T.title
HAVING
    COUNT(R.id) > 2;

-- 8. Porcentaje de tickets cerrados vs. creados en los últimos 30 días
SELECT
    COUNT(T.id) AS total_creados,
    COUNT(
        CASE
            WHEN S.name = 'Cerrado' THEN 1
        END
    ) AS total_cerrados,
    ROUND(
        (
            COUNT(
                CASE
                    WHEN S.name = 'Cerrado' THEN 1
                END
            )::NUMERIC / NULLIF(COUNT(T.id), 0)
        ) * 100,
        2
    ) AS porcentaje_cerrados
FROM tickets T
    LEFT JOIN statuses S ON T."statusId" = S.id
WHERE
    T.created_at >= NOW() - INTERVAL '30 days';