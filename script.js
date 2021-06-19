        const message = document.querySelector(".message");
        const scoreOutput = document.querySelector(".score");
        const badLeft = document.querySelector(".badLeft");
        const btn = document.querySelector(".btn");
        const basket = document.querySelector(".basket");
        const walking1 = document.querySelector("#walking-1");
        const walking2 = document.querySelector("#walking-2");
        const container = document.querySelector(".container");
        let boundBasket = basket.getBoundingClientRect();
        let boundContainer = container.getBoundingClientRect();
        let keys = {
            w: false
            , s: false
            , a: false
            , d: false
        }
        let player = {
            score: 0
            , totalBad: 0
            , inPlay: false
            , speed: 15
        };
        btn.addEventListener("click", startGame);
        document.addEventListener("keydown", pressKeyOn);
        document.addEventListener("keyup", pressKeyOff);

        function startGame() {
            message.style.display = "none";
            btn.style.display = "none";
            basket.style.display = "block";
            player.score = 0;
            player.totalBad = 100;
            player.inPlay = true;
            scoreupdate();
            setupBadGuys(6);
            requestAnimationFrame(playGame);
        }

        function setupBadGuys(num) {
            for (let x = 0; x < num; x++) {
                makeBad();
            }
        }

        function makeBad() {
            if (player.totalBad > 0) {
                let temp = player.totalBad;
                player.totalBad--;
                scoreupdate();
                let div = document.createElement("div");
                div.innerHTML = "ReactLib#" + temp;
                let ran = Math.floor(Math.random() * 50) + 50;
                div.style.height = ran + "px";
                div.style.lineHeight = ran + "px";
                div.style.backgroundColor = "#" + Math.random().toString(16).substr(-6)+"0.5";
                div.classList.add("baddy");
                div.x = Math.floor(Math.random() * boundContainer.width - 100);
                if (div.x < 0) div.x = 100;
                div.y = (Math.floor(Math.random() * 500) * -1) - 200;
                div.speed = Math.ceil(Math.random() * 10) + 3;
                container.appendChild(div);
                div.style.left = div.x + "px";
                div.style.top = div.y + "px";
            }
        }

        function playGame() {
            if (player.inPlay == true) {
                if (keys.s && boundBasket.y < (boundContainer.height - boundBasket.height)) {
                    boundBasket.y += player.speed;                    
                    walking1.style.display = "none";
                    walking2.style.display = "block";
                }
                if (keys.w && boundBasket.y > 0) {
                    boundBasket.y -= player.speed;
                    walking2.style.display = "none";
                    walking1.style.display = "block";                    
                }
                if (keys.a && boundBasket.x > 0) {
                    boundBasket.x -= player.speed;
                    walking1.style.display = "none";
                    walking2.style.display = "block";
                }
                if (keys.d && boundBasket.x < (boundContainer.width - boundBasket.width)) {
                    boundBasket.x += player.speed;
                    walking2.style.display = "none";
                    walking1.style.display = "block";
                }
                basket.style.left = boundBasket.x + "px";
                basket.style.top = boundBasket.y + "px";
                

                requestAnimationFrame(playGame);
                let tempEnemy = document.querySelectorAll(".baddy");
                if (tempEnemy.length == 0) {
                    endGame();
                }
                else {
                    for (let i = 0; i < tempEnemy.length; i++) {
                        bgMover(tempEnemy[i]);
                    }
                }
            }
        }

        function endGame() {
            message.style.display = "block";
            message.textContent = "Game Over";
            btn.style.display = "block";
            basket.style.display = "none";
            player.inPlay = false;
        }

        function bgMover(e) {
            e.y += e.speed;
            console.log("ok");
            if (e.y > boundContainer.height - 100) {
                e.y = -100;
                e.x = Math.floor(Math.random() * boundContainer.width - 100);
                if (e.x < 0) e.x = 100;
                e.style.left = e.x + "px";
            }
            if (isCollide(basket, e)) {
                player.score++;
                container.removeChild(e);
                scoreupdate();
                makeBad();
                console.log("hit");
            }
            e.style.top = e.y + "px";
        }

        function isCollide(a, b) {
            let aRect = a.getBoundingClientRect();
            let bRect = b.getBoundingClientRect();
            return !(
                (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
        }

        function scoreupdate() {
            scoreOutput.textContent = player.score;
            badLeft.textContent = player.totalBad;
        }

        function pressKeyOn(event) {
            event.preventDefault();
            keys[event.key] = true;
        }

        function pressKeyOff(event) {
            event.preventDefault();
            keys[event.key] = false;
        }