function createModel(element, color) {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 20, element.clientWidth / element.clientHeight, 0.1, 1000 );

	const renderer = new THREE.WebGLRenderer();

	renderer.setSize( element.clientWidth, element.clientHeight );
	renderer.setClearColor(new THREE.Color('white'));
	element.appendChild( renderer.domElement );

	const geometry = new THREE.BoxGeometry();
	const material = new THREE.MeshBasicMaterial( color );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	cube.rotation.y = 1;
	cube.rotation.x = 0.8;

	camera.position.z = 5;
	renderer.render( scene, camera );

	var animation;
	const animate = function () {
		animation = requestAnimationFrame( animate );
		cube.rotation.y += 0.005;
		renderer.render( scene, camera );
	};

	var animationHover;
	const hoverAnimate = function () {
		cancelAnimationFrame( animation );
		animationHover = requestAnimationFrame( hoverAnimate );

		cube.rotation.y += 0.05;

		renderer.render( scene, camera );
	};

	const stopHoverAnimate = function () {
		cancelAnimationFrame( animationHover );
		animate();
	};

	animate();
	element.addEventListener("mouseenter", hoverAnimate);
	element.addEventListener("mouseout", stopHoverAnimate)
}

var modelContainerPages = document.querySelector("#pages .model-container");
var modelContainerProducts = document.querySelector("#products .model-container");
createModel(modelContainerPages, { color: 0x0000ff });
createModel(modelContainerProducts, { color: 0x00ff00 });