```
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Location Tracker</title>
    <style>
        /* 3D CSS Styles */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            color: #fff;
            min-height: 100vh;
            margin: 0;
            padding: 0;
            perspective: 1000px;
            overflow-x: hidden;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            transform-style: preserve-3d;
        }

        .header {
            text-align: center;
            margin-bottom: 2rem;
            transform: translateZ(50px);
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            background: linear-gradient(to right, #4facfe, #00f2fe);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transform-style: preserve-3d;
            transition: all 0.5s ease;
            margin-bottom: 2rem;
        }

        .card:hover {
            transform: translateY(-10px) rotateX(5deg);
            box-shadow: 0 35px 60px rgba(0, 0, 0, 0.3);
        }

        .btn {
            background: linear-gradient(45deg, #4facfe, #00f2fe);
            border: none;
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            transform: translateZ(20px);
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .btn:hover {
            transform: translateY(-3px) translateZ(20px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .btn:active {
            transform: translateY(0) translateZ(20px);
        }

        .location-display {
            margin-top: 2rem;
            padding: 1.5rem;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 15px;
            transform-style: preserve-3d;
        }

        .coordinates {
            font-family: monospace;
            font-size: 1.2rem;
            margin: 1rem 0;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            transform: translateZ(30px);
        }

        .map-placeholder {
            width: 100%;
            height: 300px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transform-style: preserve-3d;
            transform: rotateX(5deg);
            transition: all 0.5s ease;
        }

        .map-placeholder:hover {
            transform: rotateX(0deg);
        }

        .pulse {
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(79, 172, 254, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(79, 172, 254, 0); }
            100% { box-shadow: 0 0 0 0 rgba(79, 172, 254, 0); }
        }

        footer {
            text-align: center;
            margin-top: 3rem;
            opacity: 0.7;
            font-size: 0.9rem;
        }

        /* 3D floating elements */
        .floating {
            position: absolute;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 50%;
            pointer-events: none;
        }

        .floating:nth-child(1) {
            width: 200px;
            height: 200px;
            top: -50px;
            left: -50px;
            transform: translateZ(-100px);
        }

        .floating:nth-child(2) {
            width: 300px;
            height: 300px;
            bottom: -100px;
            right: -100px;
            transform: translateZ(-150px);
        }
    </style>
</head>
<body>
    <!-- 3D floating background elements -->
    <div class="floating"></div>
    <div class="floating"></div>

    <div class="container">
        <div class="header">
            <h1>3D Location Tracker</h1>
            <p>Track and visualize your geographic location in 3D</p>
        </div>

        <div class="card">
            <h2>Get Your Location</h2>
            <p>Click the button below to share your location. We'll display your coordinates and show them on a map.</p>
            
            <button id="getLocation" class="btn pulse">Share My Location</button>
            
            <div id="locationDisplay" class="location-display" style="display: none;">
                <h3>Your Coordinates:</h3>
                <div id="coordinates" class="coordinates">Loading...</div>
                
                <div class="map-placeholder">
                    <p id="mapText">Map will appear here</p>
                </div>
                
                <p id="locationInfo">Location accuracy: Unknown</p>
            </div>
        </div>

        <div class="card">
            <h2>How It Works</h2>
            <p>This app uses your browser's Geolocation API to determine your position. The data is displayed here and can be optionally sent to our server for storage.</p>
            <p>Your location data is never shared without your permission.</p>
        </div>

        <footer>
            <p>© 2023 3D Location Tracker | Built with HTML5 Geolocation API</p>
        </footer>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const getLocationBtn = document.getElementById('getLocation');
            const locationDisplay = document.getElementById('locationDisplay');
            const coordinatesDisplay = document.getElementById('coordinates');
            const locationInfo = document.getElementById('locationInfo');
            const mapText = document.getElementById('mapText');

            // 3D Tilt Effect
            const container = document.querySelector('.container');
            document.addEventListener('mousemove', (e) => {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            });

            // Reset position when mouse leaves
            document.addEventListener('mouseleave', () => {
                container.style.transform = 'rotateY(0deg) rotateX(0deg)';
            });

            getLocationBtn.addEventListener('click', () => {
                if (navigator.geolocation) {
                    getLocationBtn.textContent = 'Detecting...';
                    getLocationBtn.classList.remove('pulse');
                    
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            // Success
                            const { latitude, longitude, accuracy } = position.coords;
                            const timestamp = new Date(position.timestamp).toLocaleString();
                            
                            // Display coordinates
                            coordinatesDisplay.innerHTML = `
                                <strong>Latitude:</strong> ${latitude.toFixed(6)}°<br>
                                <strong>Longitude:</strong> ${longitude.toFixed(6)}°<br>
                                <strong>Accuracy:</strong> ±${Math.round(accuracy)} meters<br>
                                <strong>Time:</strong> ${timestamp}
                            `;
                            
                            // Show map placeholder with link
                            mapText.innerHTML = `
                                <a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank">
                                    Open in Google Maps
                                </a>
                            `;
                            
                            locationInfo.textContent = `Location accuracy: ±${Math.round(accuracy)} meters`;
                            locationDisplay.style.display = 'block';
                            getLocationBtn.textContent = 'Update Location';
                            getLocationBtn.classList.add('pulse');
                            
                            // Send to server (uncomment to enable)
                            // sendToServer(latitude, longitude);
                        },
                        (error) => {
                            // Error
                            let errorMessage;
                            switch(error.code) {
                                case error.PERMISSION_DENIED:
                                    errorMessage = "Location access was denied.";
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    errorMessage = "Location information is unavailable.";
                                    break;
                                case error.TIMEOUT:
                                    errorMessage = "The request to get location timed out.";
                                    break;
                                case error.UNKNOWN_ERROR:
                                    errorMessage = "An unknown error occurred.";
                                    break;
                            }
                            
                            coordinatesDisplay.textContent = errorMessage;
                            locationDisplay.style.display = 'block';
                            getLocationBtn.textContent = 'Try Again';
                            getLocationBtn.classList.add('pulse');
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 10000,
                            maximumAge: 0
                        }
                    );
                } else {
                    coordinatesDisplay.textContent = "Geolocation is not supported by this browser.";
                    locationDisplay.style.display = 'block';
                }
            });

            // Function to send data to server
            async function sendToServer(lat, long) {
                try {
                    // Replace with your actual server endpoint
                    const response = await fetch('https://your-server-endpoint.com/api/location', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            latitude: lat,
                            longitude: long,
                            timestamp: new Date().toISOString()
                        }),
                    });
                    
                    const data = await response.json();
                    console.log('Server response:', data);
                } catch (error) {
                    console.error('Error sending location:', error);
                }
            }
        });
    </script>
</body>
</html>
