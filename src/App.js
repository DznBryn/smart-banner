import logo from './logo.svg';
import './App.css';

import { useEffect, useRef } from 'react';

function App() {
	const deferredPrompt = useRef(null);
	const smartBanner = useRef(null);
	// const divInstall = document.getElementById('smart-banner');
	useEffect(() => {
		smartBanner.current = document.querySelector('.smart-banner');
		console.log(smartBanner);
		window.addEventListener('beforeinstallprompt', (event) => {
			// Prevent the mini-infobar from appearing on mobile.
			event.preventDefault();
			console.log('beforeinstallprompt', event);
			// Stash the event so it can be triggered later.
			deferredPrompt.current = event;
			// Remove the 'hidden' class from the install button container.
			smartBanner.classList.toggle('hidden', false);
		});
	});
	return (
		<div className='App'>
			<div className='smart-banner hidden'>
				<p>this is a smart banner </p>
				<button
					onClick={(e) => {
						// hide our user interface that shows our A2HS button
						smartBanner.classList.toggle('hidden', true);
						// Show the prompt
						deferredPrompt.current.prompt();
						// Wait for the user to respond to the prompt
						deferredPrompt.userChoice.then((choiceResult) => {
							if (choiceResult.outcome === 'accepted') {
								console.log('User accepted the A2HS prompt');
							} else {
								console.log('User dismissed the A2HS prompt');
							}
							deferredPrompt.current = null;
						});
					}}>
					install
				</button>
			</div>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
