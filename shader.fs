#version 410

in vec3 colo;


void main()
{
	
		vec3 col=colo;
		
     gl_FragColor = vec4(col,1.0);

	 }
