const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
        const occasion = urlParams.get('occasion') || 'birthday';
        const customMsg = urlParams.get('msg');

        const messages = {
            birthday: "Wishing you a day filled with love, laughter, and wonderful memories!",
            anniversary: "Celebrating your special bond and all the beautiful moments you've shared!",
            congratulations: "So proud of your achievement! Here's to your amazing success!",
            thankyou: "Your kindness means the world! Thank you for being so wonderful!",
            getwellsoon: "Sending healing thoughts and positive vibes your way!",
            custom: customMsg || "Wishing you all the best!"
        };

        const titles = {
            birthday: "Happy Birthday!",
            anniversary: "Happy Anniversary!",
            congratulations: "Congratulations!",
            thankyou: "Thank You!",
            getwellsoon: "Get Well Soon!",
            custom: "Special Wishes!"
        };

        if (name) {
            document.getElementById('setup').classList.add('hidden');
            document.getElementById('wishCard').classList.remove('hidden');
            document.getElementById('recipientName').textContent = decodeURIComponent(name);
            document.getElementById('wishTitle').textContent = titles[occasion];
            document.getElementById('wishMessage').textContent = messages[occasion];
            createStars();
            document.querySelectorAll('.firework-wrapper').forEach(fw => fw.classList.add('animate'));
        }

        document.getElementById('occasionSelect').addEventListener('change', function() {
            const customInput = document.getElementById('customMessage');
            customInput.style.display = this.value === 'custom' ? 'block' : 'none';
        });

        function generateLink() {
            const name = document.getElementById('nameInput').value.trim();
            const occasion = document.getElementById('occasionSelect').value;
            const customMsg = document.getElementById('customMessage').value.trim();

            if (!name) {
                alert('Please enter a name!');
                return;
            }

            let link = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(name)}&occasion=${occasion}`;
            if (occasion === 'custom' && customMsg) {
                link += `&msg=${encodeURIComponent(customMsg)}`;
            }

            document.getElementById('generatedLink').textContent = link;
            document.getElementById('linkDisplay').style.display = 'block';
        }

        function copyLink() {
            const link = document.getElementById('generatedLink').textContent;
            navigator.clipboard.writeText(link).then(() => {
                const notification = document.getElementById('copyNotification');
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 2000);
            });
        }

        function createStars() {
            const starsContainer = document.getElementById('stars');
            for (let i = 0; i < 50; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 2 + 's';
                starsContainer.appendChild(star);
            }
        }