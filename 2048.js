        var gridSize;
        var windowSize=600;
            var n = prompt("Enter size :", "4");
            if ((Number(n)).isNaN || Number(n) <2) {
                alert("Wrong size!");
            } else {
                gridSize = Number(n);
            }
        var matrix = [];
        for (var i = 0; i < gridSize; i++) {
            matrix[i] = [];
            for (var j = 0; j < gridSize; j++) {
                matrix[i][j] = 0;
            }
        }
            var biggestTileBefore = 0;
            var badMovesCount = 0;
            var targetTile=2**(2+(gridSize-1)*3);
            var powersOfTwoDisplay = false;
            var randomMovement = false;
            var scoreCounter = 0;
            var turnsCounter = 0;
            var maxTileVal = 0;
            const canvas = document.getElementById('2048');
            const context = canvas.getContext('2d');
            const scoreTab = document.getElementById('scorePanel');
            const scCtx = scoreTab.getContext('2d');
            context.fillStyle = 'white';
            scCtx.fillStyle = 'white';
            function paintScore() {
                document.getElementById('score_tab').innerHTML = 'Score: ' + scoreCounter.toString();
                document.getElementById('turns_tab').innerHTML = 'Turns: ' + turnsCounter.toString();
                  document.getElementById('max_tab').innerHTML = 'Max tile: ' + maxTileValue().toString()+'/'+targetTile.toString();
            }
            function drawTile(x, y, value) {
                var color;
                if (value < 0) color = 'DimGrey';
                if (value == 0) color = 'grey';
                if (value == 2) color = 'Snow';
                if (value == 4) color = 'Bisque';
                if (value == 8) color = 'Coral';
                if (value == 16) color = 'LightCoral';
                if (value == 32) color = 'Crimson';
                if (value == 64) color = 'DarkRed';
                if (value == 128) color = 'LightGoldenRodYellow';
                if (value == 256) color = 'Khaki';
                if (value == 512) color = 'LemonChiffon';
                if (value == 1024) color = 'Yellow';
                if (value == 2048) color = 'Gold';
                if (value > 2048 && value < 10000) color = 'Black';
                if (powersOfTwoDisplay == false) {
                    context.fillStyle = color;
                    context.font = (windowSize / (2 * gridSize)).toString() + 'px serif';
                    var _fontS = (windowSize / (2 * gridSize)).toString();
                    context.fillRect(x, y, windowSize / gridSize, windowSize / gridSize);
                    context.fillStyle = 'black';
                    if (value > 0) {
                        if (value < 10) context.fillText(value, x + (windowSize / gridSize) / 2 - _fontS / 4, y + (windowSize / gridSize) / 2 + _fontS / 4);
                        if (value > 10 && value < 100) context.fillText(value, x + (windowSize / gridSize) / 2 - _fontS / 2, y + (windowSize / gridSize) / 2 + _fontS / 4);
                        if (value > 100 && value < 1000) context.fillText(value, x + (windowSize / gridSize) / 2 - _fontS / 2 - _fontS / 4, y + (windowSize / gridSize) / 2 + _fontS / 4);
                        if (value > 1000) context.fillText(value, x + (windowSize / gridSize) / 2 - _fontS, y + (windowSize / gridSize) / 2 + _fontS / 4);
                        if (value > 2048 && value < 10000) {
                            context.fillStyle = 'white';
                            context.fillText(value, x + (windowSize / gridSize) / 2 - _fontS, y + (windowSize / gridSize) / 2 + _fontS / 4);
                        }
                        if (value > 10000) {
                            context.fillStyle = 'white';
                            var p2 = Math.floor(Math.log2(value));
                            if (p2 < 100) {
                                var p2_txt = '2^' + p2.toString();
                                context.fillText(p2_txt, x + (windowSize / gridSize) / 2 - _fontS, y + (windowSize / gridSize) / 2 + _fontS / 4);
                            }
                            if (p2 > 99) {
                                var p2_txt = '2^' + p2.toString();
                                var _fntsS = (4 / 5) * (windowSize / (2 * gridSize));
                                context.font = _fntsS.toString() + 'px serif';
                                context.fillText(p2_txt, x + (windowSize / gridSize) / 2 - _fntsS, y + (windowSize / gridSize) / 2 + _fntsS / 4);
                            }

                        }
                    }
                    if (value < 0) {
                        context.fillStyle = 'Crimson';
                        context.fillText('?', x, y + ((windowSize / 2)) / gridSize);
                    }
                }
                if (powersOfTwoDisplay == true) {
                    var color;
                    context.fillStyle = color;
                    context.fillRect(x, y, parseInt(windowSize / gridSize), parseInt(windowSize / gridSize));
                    context.font = (windowSize / (2 * gridSize)).toString() + 'px serif';
                    var _fontS = (windowSize / (2 * gridSize));
                    var p2 = Math.floor(Math.log2(value));
                    var p2_txt = '2^' + p2.toString();
                    if (p2 < 100) {
                        var p2_txt = '2^' + p2.toString();
                        context.fillText(p2_txt, x + (windowSize / gridSize) / 2 - _fontS, y + (windowSize / gridSize) / 2 + _fontS / 4);
                    }
                }
                matrix[Math.floor((x / windowSize) * gridSize)][Math.floor((y / windowSize) * gridSize)] = value;
            }

            function InitField() {
                scoreCounter = 0;
                turnsCounter = 0;
                badMovesCount = 0;
                randomMovement=false;
                for (let i = 0; i < gridSize ; i++) {
                    for (let j = 0; j < gridSize ; j++) drawTile((windowSize / gridSize) * i, (windowSize / gridSize) * j, 0);
                }
                var p1x = Math.floor(Math.random() * gridSize) * windowSize / gridSize,
                  p1y = Math.floor(Math.random() * gridSize) * windowSize / gridSize;
                drawTile(p1x, p1y, 2);
                var p2x = Math.floor(Math.random() * (gridSize - 1)) * windowSize / gridSize;
                var p2y = Math.floor(Math.random() * (gridSize - 1)) * windowSize / gridSize;
                while (p2y == p1y && p2x == p1x) {
                    var p2x = Math.floor(Math.random() * (gridSize - 1)) * windowSize / gridSize;
                    var p2y = Math.floor(Math.random() * (gridSize - 1)) * windowSize / gridSize;
                }

                drawTile(p2x, p2y, 2);
                maxTileVal = maxTileValue();
                paintScore();
            }
            function spawnTile2() {
                var emptyTilesCount = 0;
                for (let i = 0; i < gridSize ; i++) {
                    for (let j = 0; j < gridSize ; j++) {
                        if (matrix[i][j] == 0) emptyTilesCount++;
                    }
                }
                if (emptyTilesCount == 0) return;
                if (emptyTilesCount == -1) {
                    var emptyTilesX = [];
                    var emptyTilesY = [];
                    var q = 0;
                    var emptyTileX;
                    var emptyTileY;
                    for (let i = 0; i < gridSize; i++) {
                        for (let j = 0; j < gridSize; j++) {
                            if (matrix[i][j] == 0) {
                                emptyTileX = i;
                                emptyTileY = j;
                            }
                        }

                        matrix[emptyTileX][emptyTileY] = 2;
                    }
                }
                if (emptyTilesCount > 0) {
                    var t2posX = Math.floor(Math.random() * gridSize);
                    var t2posY = Math.floor(Math.random() * gridSize);
                    while (matrix[t2posX][t2posY] != 0) {
                        t2posX = Math.floor(Math.random() * gridSize);
                        t2posY = Math.floor(Math.random() * gridSize);
                    }
                    matrix[t2posX][t2posY] = 2;
                }
            }
            function restartGame() {
                for (var i = 0; i < gridSize; i++) {
                    for (var j = 0; j < gridSize; j++) {
                        matrix[i][j] = 0;
                    }
                }
                InitField();
            }
            function moveLeft() {
                var k = 1;
                var movesMadeLeft = 0;
                while (k > 0) {
                    k = 0;
                    for (let i = 1; i < gridSize; i++) {
                        //if i=0 we cant move left as we`ll go out of bounds
                        for (let j = 0; j < gridSize; j++) {
                            if (matrix[i][j] > 0) {
                                //if tile isn`t empty
                                if (matrix[i - 1][j] == 0) {
                                    matrix[i - 1][j] = matrix[i][j];
                                    matrix[i][j] = 0;
                                    k++;
                                    movesMadeLeft++;
                                }
                                if (matrix[i - 1][j] == matrix[i][j]) {
                                    //alert("merged");
                                    matrix[i - 1][j] += matrix[i][j];
                                    scoreCounter += matrix[i][j];
                                    matrix[i][j] = 0;
                                    k++;
                                    movesMadeLeft++;
                                    maxTileVal = maxTileValue();
                                }
                            }
                        }
                    }
                }
                if (movesMadeLeft > 0) { spawnTile2(); turnsCounter++;  }
            }

            function moveRight() {
                var k = 1;
                var movesMadeRight = 0;
                while (k > 0) {
                    k = 0;
                    for (let i = gridSize - 2; i > -1; i--) {
                        for (let j = 0; j < gridSize; j++) {
                            if (matrix[i][j] > 0) {
                                //if tile isn`t empty
                                if (matrix[i + 1][j] == 0) {
                                    matrix[i + 1][j] = matrix[i][j];
                                    matrix[i][j] = 0;
                                    k++;
                                    movesMadeRight++;
                                }
                                if (matrix[i + 1][j] == matrix[i][j]) {
                                    //alert("merged");
                                    matrix[i + 1][j] += matrix[i][j];
                                    scoreCounter += matrix[i][j];
                                    matrix[i][j] = 0;
                                    k++;
                                    movesMadeRight++;
                                    maxTileVal = maxTileValue();
                                }
                            }
                        }
                    }
                }
                if (movesMadeRight > 0) {spawnTile2(); turnsCounter++; }
            }
            function moveUp() {
                var k = 1;
                var movesMadeUp = 0;
                while (k > 0) {
                    k = 0;

                    for (let i = 0; i < gridSize; i++) {
                        for (let j = 1; j < gridSize; j++) {
                            if (matrix[i][j] > 0) {
                                //if tile isn`t empty
                                if (matrix[i][j - 1] == 0) {
                                    matrix[i][j - 1] = matrix[i][j];
                                    matrix[i][j] = 0;
                                    k++;
                                    movesMadeUp++;
                                }
                                if (matrix[i][j - 1] == matrix[i][j]) {
                                    matrix[i][j - 1] += matrix[i][j];
                                    scoreCounter += matrix[i][j];
                                    matrix[i][j] = 0;
                                    k++;
                                    movesMadeUp++;
                                    maxTileVal = maxTileValue();
                                }
                            }
                        }
                    }
                }
                if (movesMadeUp > 0) {spawnTile2(); turnsCounter++;}
            }
            function moveDown() {
                var k = 1;
                var movesMadeDown = 0;
                while (k > 0) {
                    k = 0;
                    //i - right , j- down
                    for (let i = 0; i < gridSize; i++) {
                        for (let j = gridSize - 2; j > -1; j--) {
                            if (matrix[i][j] > 0) {
                                //if tile isn`t empty
                                if (matrix[i][j + 1] == 0) {
                                    matrix[i][j + 1] = matrix[i][j];
                                    matrix[i][j] = 0;
                                    k++;
                                    movesMadeDown++;
                                }
                                if (matrix[i][j + 1] == matrix[i][j]) {
                                    matrix[i][j + 1] += matrix[i][j];
                                    scoreCounter += matrix[i][j];
                                    matrix[i][j] = 0;
                                    k++;
                                    movesMadeDown++;
                                    maxTileVal = maxTileValue();
                                }
                            }
                        }
                    }
                }
                if (movesMadeDown > 0) {spawnTile2(); turnsCounter++; }
            }
            function checkMovePossibility() {
                //  var movableTiles = 0
                for (let j = gridSize - 2; j > -1; j--) {
                    for (let i = 0; i < gridSize; i++) {
                        if (matrix[i][j] > 0) {
                            //if tile isn`t empty
                            if (matrix[i][j + 1] == 0) {
                                return true;
                            }
                            if (matrix[i][j + 1] == matrix[i][j]) {
                                return true;
                            }
                        }
                    }
                }
                for (let j = 1; j < gridSize; j++) {
                    for (let i = 0; i < gridSize; i++) {
                        if (matrix[i][j] > 0) {
                            //if tile isn`t empty
                            if (matrix[i][j - 1] == 0) {
                                return true;
                            }
                            if (matrix[i][j - 1] == matrix[i][j]) {
                                return true;
                            }
                        }
                    }
                }
                for (let i = gridSize - 2; i > -1; i--) {
                    for (let j = 0; j < gridSize; j++) {
                        if (matrix[i][j] > 0) {
                            //if tile isn`t empty
                            if (matrix[i + 1][j] == 0) {
                                return true;
                            }
                            if (matrix[i + 1][j] == matrix[i][j]) {
                                return true;
                            }
                        }
                    }
                }
                for (let i = 1; i < gridSize; i++) {
                    //if i=0 we cant move left as we`ll go out of bounds
                    for (let j = 0; j < gridSize; j++) {
                        if (matrix[i][j] > 0) {
                            //if tile isn`t empty
                            if (matrix[i - 1][j] == 0) {
                                return true;
                            }
                            if (matrix[i - 1][j] == matrix[i][j]) {
                     
                                return true;
                            }
                        }
                    }
                }

                return false;
            }
           
            function render() {
                for (let i = 0; i < gridSize; i++) {
                    for (let j = 0; j < gridSize; j++) {
                        drawTile(windowSize / gridSize * i, windowSize / gridSize * j, matrix[i][j]);
                    }
                }
                paintScore();
            }
            function freeTilesCount() {
                let freeTiles = 0;
                for (let i = 0; i < gridSize; i++) {
                    for (let j = 0; j < gridSize; j++) {
                        if (matrix[i][j] == 0) freeTiles++;
                    }
                }
                return freeTiles;
            }
            function maxTileValue() {
                var maxValue = 0;
                for (let i = 0; i < gridSize; i++) {
                    for (let j = 0; j < gridSize; j++) {
                        if (matrix[i][j] > maxValue) maxValue = matrix[i][j];
                    }
                }
                return maxValue;
            }
            document.onkeydown = function (e) {
                switch (e.keyCode) {
                    case 37://left key
                        moveLeft();
                        render();
                        if(maxTileValue()==targetTile)
                        {

                            restartGame();
                        }
                        if (!checkMovePossibility()) {
                            alert("Game over!");

                            restartGame();
                        }

                        break;
                    case 38://key up
                        moveUp();
                        render();
                        if(maxTileValue()==targetTile)
                        {

                        alert("You win!");
                            restartGame();
                        }
                        if (!checkMovePossibility()) {

                            alert("Game over!");

                            restartGame();
                        }
                        break;
                    case 39://key right
                        moveRight();
                        render();
                        if(maxTileValue()==targetTile)
                        {

                        alert("You win!");
                            restartGame();
                        }
                        if (!checkMovePossibility()) {

                            alert("Game over!");

                            restartGame();
                        }
                        break;
                    case 40://key down
                        moveDown();
                        render();
                        if(maxTileValue()==targetTile)
                        {

                        alert("You win!");
                            restartGame();
                        }
                        if (!checkMovePossibility()) {

                            alert("Game over!");
                            restartGame();
                        }
                        break;
                    case 67:// key C
                        restartGame();
                        render();
                        break;
                }
            };
            InitField();
