let choseAtkElements = document.getElementsByName("choseA");
let choseDefElements = document.getElementsByName("choseD");
let accept = document.getElementById("accept");
let heroList = document.getElementById("heroList");
let gameChat = document.getElementById("gameChat");
let nextBattle = document.getElementById("nextBaltte");
// let enemyStats = {
//     lightEnemyStats = {
//         battleSkills = {
//             chanceAttack: 80,
//             chanceDodge: 0, 
//         },
//         battleExp: 0,
//     },
//     middleEnemyStats = {
//         battleSkills = {
//             chanceAttack: 100,
//             chanceDodge: 5, 
//         },
//         battleExp: 10,
//     },
//     HardEnemyStats = {
//         battleSkills = {
//             chanceAttack: 120,
//             chanceDodge: 10, 
//         },
//         battleExp: 30,
//     },
//     BossEnemyStats = {
//         battleSkills = {
//             chanceAttack: 150,
//             chanceDodge: 30, 
//         },
//         battleExp: 50,
//     }
// }

function createHero(playerName) {
    let heroInfo = {
        name: playerName,
        hp: 50,
        xp: 0,
        needXpForLvlUp: 30,
        lvl: 1,
        damage: 10,
        atkBodyPart: null,
        defBodyPart: null,
    }
    return heroInfo;
}

let player = createHero("Richard");
let enemy = createHero("Legolas");

heroName.innerHTML = "Имя: " + player.name;
heroHP.innerHTML = "Здоровье: " + player.hp;
heroDamage.innerHTML = "Урон: " + player.damage;
heroLvl.innerHTML = "Уровень: " + player.lvl;
heroXP.innerHTML = "Опыт: " + player.xp + "/" + player.needXpForLvlUp;

// function lvlUp(player) {
//     player.lvl++;
//     player.hp = player.hp + 10;
//     player.damage = player.damage + 5;
//     player.needXpForLvlUp = player.needXpForLvlUp * 2;
//     console.log("Уровень персонажа повышен!");
//     return player;
// }

// function checkLvlUp(player) {
//     if(player.xp >= player.needXpForLvlUp) {
//         player.xp = player.xp - player.needXpForLvlUp;
//         lvlUp(player);
//     }
//     return player;
//}

//Функция выбора атаки и защиты

function preparePlayer() {
    for(let index in choseAtkElements) {
        if(choseAtkElements[index].checked) {
            player.atkBodyPart = choseAtkElements[index].value;
            gameChat.innerHTML += "Вы бьете по " + player.atkBodyPart + "<br>";
        }
    }
    for(let index in choseDefElements) {
        if(choseDefElements[index].checked) {
            player.defBodyPart = choseDefElements[index].value;
            gameChat.innerHTML += "Вы защищаете " + player.defBodyPart + "<br>";
        }
    }
    if(!player.atkBodyPart) {
        gameChat.innerHTML += "Пункт атаки не выбран" + "<br>";
    }
    if(!player.defBodyPart) {
        gameChat.innerHTML += "Пункт защиты не выбран" + "<br>";
    }
}

function prepareEnemy() {
    let bodyParts = ["head", "body", "legs"];
    let atkRandom = Math.round(Math.random() * 2);
    let defRandom = Math.round(Math.random() * 2);
    enemy.atkBodyPart = bodyParts[atkRandom];
    enemy.defBodyPart = bodyParts[defRandom];
    gameChat.innerHTML += "Противник атакует " + enemy.atkBodyPart + " и защищает " + enemy.defBodyPart + "<br>";
}

function battle(player, enemy) {
    if(player.atkBodyPart == enemy.defBodyPart) {
        gameChat.innerHTML += "Противник блокировал удар!<br>";
    }
    else {
        enemy.hp = enemy.hp - player.damage;
        gameChat.innerHTML += "Вы нанесли удар по " + player.atkBodyPart + " противника и нанесли "
         + player.damage + " урона. У противника осталось " + enemy.hp + " здоровья!<br>";
         checkWinner(player, enemy);
    }
    if(enemy.atkBodyPart == player.defBodyPart) {
        gameChat.innerHTML += "Вы заблокировали удар противника!<br>";
    }
    else {
        player.hp = player.hp - enemy.damage;
        gameChat.innerHTML += "Противник нанес удар вам по " + enemy.atkBodyPart + " и отнял "
         + enemy.damage + " здоровья. У вас осталось " + player.hp + " здоровья!<br>";
         checkWinner(player, enemy);
    }
}

function checkWinner(player, enemy) {
    if(player.hp <= 0) {
        gameChat.innerHTML += "Вы проиграли! Бой завершен" + "<br>";
    }
    else if(enemy.hp <= 0) {
        gameChat.innerHTML += "Вы победили! Бой завершен" + "<br>";
    }
    return;
}

accept.onclick = function() {
    preparePlayer();
    if(player.atkBodyPart && player.defBodyPart) {
        prepareEnemy();
        battle(player, enemy);
    }
}
