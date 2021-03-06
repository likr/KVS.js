KVS.THREEScreen = function()
{
    this.width = 0;
    this.height = 0;
    this.scene = undefined;
    this.camera = undefined;
    this.light = undefined;
    this.renderer = undefined;
    this.trackball = undefined;
};

KVS.THREEScreen.prototype =
{
    constructor: KVS.THREEScreen,

    init: function( object )
    {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        var max_range = object.max_coord.clone().sub( object.min_coord ).max();
        var center = object.objectCenter();

        var fov = 45;
        var aspect = this.width / this.height;
        var near = 0.1;
        var far = max_range * 100;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
        this.camera.position.set( center.x, center.y, max_range * 2 );
        this.camera.up.set( 0, 1, 0 );
        this.scene.add( this.camera );

        this.light = new THREE.DirectionalLight( new THREE.Color( "white" ) );
        this.light.position = this.camera.position;
        this.scene.add( this.light );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.width, this.height );
//        this.renderer.setClearColor( new THREE.Color( "black" ) );
        this.renderer.setClearColor( new THREE.Color( 0.828125, 0.86328125, 0.89453125 ) );

        this.trackball = new THREE.TrackballControls( this.camera );
        this.trackball.staticMoving = true;
        this.trackball.rotateSpeed = 3;
        this.trackball.radius = Math.min( this.width, this.height );
        this.trackball.target = center;
        this.trackball.update();
        this.trackball.addEventListener( 'change', this.draw );

        document.body.appendChild( this.renderer.domElement );
        window.addEventListener( 'resize', this.resize.bind( this ), false );
    },

    resize: function()
    {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        var aspect = this.width / this.height;

        this.renderer.setSize( this.width, this.height );
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
        this.trackball.handleResize();
        this.draw();
    },

    draw: function()
    {
        if ( this.renderer == undefined ) return;
        this.renderer.render( this.scene, this.camera );
        this.trackball.update();
    },

    loop: function()
    {
        requestAnimationFrame( this.loop.bind( this ) );
        this.draw();
    },
};
