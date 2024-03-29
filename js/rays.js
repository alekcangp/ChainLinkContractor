// https://codepen.io/towc/blog/a-guide-to-wavy-waved-radial-waves/

var w = c.width = window.innerWidth,
		h = c.height = window.innerHeight,
		ctx = c.getContext('2d'),

		opts = {

			rays: 20,
			maxRadius: 2 * Math.sqrt( w*w/4 + h*h/4 ),
			circleRadiusIncrementAcceleration:5,
			radiantSpan: .9,
			rayAngularVelSpan: .002,
			rayAngularVelLineWidthMultiplier: 40,
			rayAngularAccWaveInputBaseIncrementer: .03,
			rayAngularAccWaveInputAddedIncrementer: .02,
			rayAngularAccWaveMultiplier: .00003,
			baseWaveInputIncrementer: .005,
			addedWaveInputIncrementer: .005,
			circleNumWaveIncrementerMultiplier: .05,
			
			cx: w / 2,
			cy: h / 2,
			tickHueMultiplier: 1,
			shadowBlur: 0,
			repaintAlpha: .2,
			apply: init
		},
		
		rays = [],
		tick = 0,
		tickHueMultiplied,
		gui = new dat.GUI({ autoPlace: false });

function init(){
	
	rays.length = 0;
	for( var i = 0; i < opts.rays; ++i )
		rays.push( new Ray );
	
	if( tick === 0 ){
		
		for( opt in opts ){
			
			if( isNaN( opts[ opt ] ) )
				gui.add( opts, opt );
			else
				gui.add( opts, opt, 0, opts[ opt ] * 3 )
		}
		gui.close();
		
		loop();
	}
}

function loop(){
	
	window.requestAnimationFrame( loop );
	
  ++tick;
	
	ctx.globalCompositeOperation = 'source-over';
	ctx.shadowBlur = 0;
	ctx.fillStyle = 'rgba(0,0,0,alp)'.replace( 'alp', opts.repaintAlpha );
	ctx.fillRect( 0, 0, w, h );
	ctx.shadowBlur = opts.shadowBlur;
	ctx.globalCompositeOperation = 'lighter';
	
	tickHueMultiplied = opts.tickHueMultiplier * tick;
	
	rays.map( function( ray ){ ray.step(); } );
}

function Ray(){
	
	this.circles = [ new Circle( 0 ) ];
	this.rot = Math.random() * Math.PI * 2;
	this.angularVel = Math.random() * opts.rayAngularVelSpan * ( Math.random() < .5 ? 1 : -1 );
	this.angularAccWaveInput = Math.random() * Math.PI * 2;
	this.angularAccWaveInputIncrementer = opts.rayAngularAccWaveInputBaseIncrementer + opts.rayAngularAccWaveInputAddedIncrementer * Math.random();
	
	var security = 100,
			count = 0;
	
	while( --security > 0 && this.circles[ count ].radius < opts.maxRadius )
		this.circles.push( new Circle( ++count ) );
}
Ray.prototype.step = function(){
	
	// this is just messy, but if you take your time to read it properly you'll understand it pretty easily
	this.rot += 
		this.angularVel += Math.sin( 
			this.angularAccWaveInput += 
				this.angularAccWaveInputIncrementer ) * opts.rayAngularAccWaveMultiplier;
	
	var rot = this.rot,
			x = opts.cx,
			y = opts.cy;
	
	ctx.lineWidth = Math.min( .00001 / Math.abs( this.angularVel ), 10 / opts.rayAngularVelLineWidthMultiplier ) * opts.rayAngularVelLineWidthMultiplier;

	ctx.beginPath();
	ctx.moveTo( x, y );
	
	for( var i = 0; i < this.circles.length; ++i ){
		
		var circle = this.circles[ i ];
		
		circle.step();
		
		rot += circle.radiant;
		
		var x2 = opts.cx + Math.sin( rot ) * circle.radius,
				y2 = opts.cy + Math.cos( rot ) * circle.radius,
				
				mx = ( x + x2 ) / 2,
				my = ( y + y2 ) / 2;
		
		ctx.quadraticCurveTo( x, y, mx, my );
		
		x = x2;
		y = y2;
	}
	
	ctx.strokeStyle = ctx.shadowColor = 'hsl(hue,80%,50%)'.replace( 'hue', ( ( ( rot + this.rot ) / 2 ) % ( Math.PI * 2 ) ) / Math.PI * 30 + tickHueMultiplied );
	
	ctx.stroke();
}

function Circle( n ){
	
	this.radius = opts.circleRadiusIncrementAcceleration * Math.pow( n, 2 );
	this.waveInputIncrementer = ( opts.baseWaveInputIncrementer + opts.addedWaveInputIncrementer * Math.random() ) * ( Math.random() < .5 ? 1 : -1 ) * opts.circleNumWaveIncrementerMultiplier * n;
	this.waveInput = Math.random() * Math.PI * 2;
	this.radiant = Math.random() * opts.radiantSpan * ( Math.random() < .5 ? 1 : -1 );
}
Circle.prototype.step = function(){
	
	this.waveInput += this.waveInputIncrementer;
	this.radiant = Math.sin( this.waveInput ) * opts.radiantSpan;
}
init();

window.addEventListener( 'resize', function(){
	
	w = c.width = window.innerWidth;
	h = c.height = window.innerHeight;
	
	opts.maxRadius = Math.sqrt( w*w/4 + h*h/4 );
	opts.cx = w / 2;
	opts.cy = h / 2;
	
	init();
});
c.addEventListener( 'click', function(e){
	
	opts.cx = e.clientX;
	opts.cy = e.clientY;
	
})