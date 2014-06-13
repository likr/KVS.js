function main()
{
    var volume = new KVS.CreateTornadoData( 64, 64, 64 );

    var screen = new KVS.THREEScreen();
    screen.init( volume.objectCenter() );
    screen.camera.position.set( 0, 0, 180 );
    screen.camera.up.set( 0, 1, 0 );
    setup();
    screen.loop();

    function setup()
    {
        var color = new KVS.Vec3( 1, 1, 1 );
        var box = new KVS.BoundingBox();
        box.setColor( color );
        box.setWidth( 5 );

        var seed_point = volume.objectCenter();
        var streamline = new KVS.Streamline();
        streamline.setIntegrationStepLength( 0.5 );
        streamline.setIntegrationTime( 500 );
        streamline.setIntegrationMethod( KVS.RungeKutta4 );
        streamline.setLineWidth( 5 );
        streamline.setSeedPoint( seed_point );

        var line1 = KVS.ToTHREELine( box.exec( volume ) );
        var line2 = KVS.ToTHREELine( streamline.exec( volume ) );
        screen.scene.add( line1 );
        screen.scene.add( line2 );
        screen.draw();
    }
}