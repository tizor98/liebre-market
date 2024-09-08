create table if not exists liebre_market.categories
(
    id        int auto_increment
        primary key,
    name      varchar(90)                           not null,
    createdAt timestamp default current_timestamp() not null,
    updatedAt timestamp default current_timestamp() not null on update current_timestamp(),
    deletedAt timestamp                             null
);

create table if not exists liebre_market.countries
(
    id        smallint(3) auto_increment
        primary key,
    name      varchar(45)                           not null,
    createdAt timestamp default current_timestamp() not null,
    updatedAt timestamp default current_timestamp() not null on update current_timestamp(),
    deletedAt timestamp                             null
);

create table if not exists liebre_market.users
(
    id          bigint auto_increment
        primary key,
    email       varchar(90)                           not null,
    name        varchar(56)                           not null,
    surname     varchar(56)                           not null,
    dni         int                                   not null,
    password    text                                  not null,
    address     varchar(56)                           null,
    birthday    date                                  not null,
    country_id  smallint(3)                           null,
    img_profile varchar(90)                           null,
    createdAt   timestamp default current_timestamp() not null,
    updatedAt   timestamp default current_timestamp() not null on update current_timestamp(),
    deletedAt   timestamp                             null,
    constraint idx_users_username
        unique (email),
    constraint users_countries_fk
        foreign key (country_id) references countries (id)
            on update cascade
);

create table if not exists liebre_market.payment_methods
(
    id         int auto_increment
        primary key,
    type       varchar(2)                            not null,
    number     bigint                                not null,
    expiration varchar(8)                            not null,
    cvv        varchar(8)                            not null,
    user_id    bigint                                not null,
    createdAt  timestamp default current_timestamp() null,
    updatedAt  timestamp default current_timestamp() null on update current_timestamp(),
    deletedAt  timestamp                             null,
    constraint users_payments
        foreign key (user_id) references users (id)
            on update cascade
);

create table if not exists liebre_market.invoices
(
    id         bigint auto_increment
        primary key,
    buyer_id   bigint                                not null,
    payment_id int                                   null,
    seller_id  bigint                                not null,
    total      float                                 null,
    createdAt  timestamp default current_timestamp() not null,
    updatedAt  timestamp default current_timestamp() not null on update current_timestamp(),
    deletedAt  timestamp                             null,
    constraint invoices_buyer_fk
        foreign key (buyer_id) references users (id)
            on update cascade,
    constraint invoices_payment_fk
        foreign key (payment_id) references payment_methods (id),
    constraint invoices_seller_fk
        foreign key (seller_id) references users (id)
            on update cascade
);

create table if not exists liebre_market.products
(
    id          bigint auto_increment
        primary key,
    name        varchar(45)                           not null,
    description text                                  not null,
    price       float                                 not null,
    discount    float                                 null,
    seller_id   bigint                                not null,
    category_id int                                   not null,
    createdAt   timestamp default current_timestamp() not null,
    updatedAt   timestamp default current_timestamp() not null on update current_timestamp(),
    deletedAt   timestamp                             null,
    constraint products_category_fk
        foreign key (category_id) references categories (id),
    constraint products_users_fk
        foreign key (seller_id) references users (id)
);

create table if not exists liebre_market.invoices_products
(
    id            bigint auto_increment
        primary key,
    invoice_id    bigint                                not null,
    product_id    bigint                                not null,
    selling_price float                                 not null,
    createdAt     timestamp default current_timestamp() not null,
    updatedAt     timestamp default current_timestamp() not null on update current_timestamp(),
    deletedAt     timestamp                             null,
    constraint invoices_products_invoices_fk
        foreign key (invoice_id) references invoices (id)
            on update cascade,
    constraint invoices_products_products_fk
        foreign key (product_id) references products (id)
            on update cascade
);

create table if not exists liebre_market.product_img
(
    id         bigint auto_increment
        primary key,
    product_id bigint                                not null,
    img        varchar(90)                           not null,
    main_img   tinyint                               null,
    createdAt  timestamp default current_timestamp() not null,
    updatedAt  timestamp default current_timestamp() not null on update current_timestamp(),
    deletedAt  timestamp                             null,
    constraint imgs_products_fk
        foreign key (product_id) references products (id)
            on update cascade on delete cascade
);

create table if not exists liebre_market.users_categories
(
    id          bigint auto_increment
        primary key,
    user_id     bigint                                not null,
    category_id int                                   not null,
    createdAt   timestamp default current_timestamp() not null,
    updatedAt   timestamp default current_timestamp() not null on update current_timestamp(),
    deletedAt   timestamp                             null,
    constraint users_categories_categories
        foreign key (category_id) references categories (id)
            on update cascade,
    constraint users_categories_users
        foreign key (user_id) references users (id)
            on update cascade
);
