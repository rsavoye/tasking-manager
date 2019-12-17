import React, { useEffect } from 'react';
import { useLink } from 'react-meta-elements'

export function Editor() {
	useLink({rel: "stylesheet", href: '/static/dist/iD.css'});
	useEffect(
	  () => {
			if (window && window.iD) {
				let id = window.iD
				.coreContext()
				.embed(true)
				.assetPath('/static/dist/');
				// disable boundaries (unless we have an explicit disable_features list)
				var q = window.iD.utilStringQs(window.location.hash.substring(1));
				if (!q.hasOwnProperty('disable_features')) {
					id.features().disable('boundaries');
				}
				id.ui()(document.getElementById('id-container'), function() {
					id.container()
					.select('#about-list')
					.insert('li', '.user-list')
					.attr('class', 'source-switch')
					.call(
						window.iD.uiSourceSwitch(id).keys([
							{
								urlroot: 'https://www.openstreetmap.org',
								oauth_consumer_key: '5A043yRSEugj4DJ5TljuapfnrflWDte8jTOcWLlT',
								oauth_secret: 'aB3jKq1TRsCOUrfOIZ6oQMEDmv2ptV76PA54NGLL',
							},
							{
								urlroot: 'https://api06.dev.openstreetmap.org',
								oauth_consumer_key: 'zwQZFivccHkLs3a8Rq5CoS412fE5aPCXDw9DZj7R',
								oauth_secret: 'aMnOOCwExO2XYtRVWJ1bI9QOdqh1cay2UgpbhA6p',
							},
						]),
					);
				});
			}
	  }, []
	);

  return <div style={{ height: '1000px' }} id="id-container"></div>;
}
