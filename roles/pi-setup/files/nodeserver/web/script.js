async function fetchAPI() {
	$('.LoadingBox').show();
	$('.UnavailableData').hide();
	$('.TextBox').hide();

	const url = `http://127.0.0.1:4000`;
	const response = await fetch(url);
	if (!response.ok) {
		$('.Loading').hide();
		$('.UnavailableData').show();
		hideInfo();
		return;
	}
	const data = await response.json();

	await $('.LoadingBox').hide();
	await $('.TextBox').show();
}

fetchAPI();
