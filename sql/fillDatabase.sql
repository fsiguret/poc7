INSERT INTO Users (firstName, lastName, email, password, rank)
    VALUES  ("Jean", "Faustin", "jean-faustin@groupomania.com", "1234", 0),
            ("Cammile", "Thériault", "cammile-theriault@groupomania.com", "1234", 0),
            ("Élisabeth", "Fluet", "elisabeth-fluet@groupomania.com", "1234", 4);

INSERT INTO Articles (userId, content, createAt, imageUrl)
    VALUES  (1,"Un article intéréssant", NOW(), NULL),
            (1,"Un article bien plus intéréssant", NOW(), NULL),
            (1,"Un simple article", NOW(), NULL),
            (1,"Quand les poules auront des dents", NOW(), NULL),
            (2,"Les chats ronronnes si fort !", NOW(), NULL),
            (2,"La chêvre dans le jardin a disparue !!", NOW(), NULL),
            (2,"Le rendez-vous avec Jean c'est très bien passé : Compte rendu", NOW(), NULL),
            (2,"Des idées pour améliorer le fonctionnement de notre équipe ?", NOW(), NULL),
            (2,"Vendredi soir est le départ de Mme Jtarose, venez participer au pot de départ !", NOW(), NULL),
            (3,"Présentation du projet 'La queue du chat balance'.", NOW(), NULL),
            (3,"Je donne ma langue au chat.", NOW(), NULL),
            (3,"Proposition de logiciel.", NOW(), NULL),
            (3,"Plutôt conventionnel ou agile ?", NOW(), NULL);

INSERT INTO Commentary (userId, articleId, createAt, com)
    VALUES  (1,1,NOW(),"Un commentaire sacrément utile."),
            (1,1,NOW(),"Un commentaire sacrément utile."),
            (2,1,NOW(),"Un commentaire sacrément utile."),
            (2,1,NOW(),"Un commentaire sacrément utile."),
            (3,1,NOW(),"Un commentaire sacrément utile."),
            (3,1,NOW(),"Un commentaire sacrément utile."),
            (3,1,NOW(),"Un commentaire sacrément utile."),
            (1,1,NOW(),"Un commentaire sacrément utile.");

