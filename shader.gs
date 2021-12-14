#version 410

layout (lines_adjacency) in;
layout (triangle_strip, max_vertices = 6) out;

in VS_OUT {
    float colour;

}vertex_in[];

out vec3 colo;

uniform mat4 gWorld;

float interpolate(float x, float y,float isolevel,float a,float b)
{
		float z;
		if (a == b) {
			z = (x + y) / 2.0f;
		}
		else {
			// interp == 0: vert should be at p1
			// interp == 1: vert should be at p2
			float interp = abs((isolevel - a) / (b - a));
			float oneMinusInterp = 1 - interp;

			z = x * oneMinusInterp + y * interp;
		}
		return z;
}

float colormap_red(float x) {
    if (x < 0.0) {
        return 167.0;
    } else if (x < (2.54491177159840E+02 + 2.49117061281287E+02) / (1.94999353031535E+00 + 1.94987400471999E+00)) {
        return -1.94987400471999E+00 * x + 2.54491177159840E+02;
    } else if (x <= 255.0) {
        return 1.94999353031535E+00 * x - 2.49117061281287E+02;
    } else {
        return 251.0;
    }
}

float colormap_green(float x) {
    if (x < 0.0) {
        return 112.0;
    } else if (x < (2.13852573128775E+02 + 1.42633630462899E+02) / (1.31530121382008E+00 + 1.39181683887691E+00)) {
        return -1.39181683887691E+00 * x + 2.13852573128775E+02;
    } else if (x <= 255.0) {
        return 1.31530121382008E+00 * x - 1.42633630462899E+02;
    } else {
        return 195.0;
    }
}

float colormap_blue(float x) {
    if (x < 0.0) {
        return 255.0;
    } else if (x <= 255.0) {
        return -9.84241021836929E-01 * x + 2.52502692064968E+02;
    } else {
        return 0.0;
    }
}

vec3 colormap(float x) {
    float t = x * 255.0;
    float r = colormap_red(t) / 255.0;
    float g = colormap_green(t) / 255.0;
    float b = colormap_blue(t) / 255.0;
    return vec3(r, g, b);
}


void main()
{
	int n,i,a=0,b=0,c=0,d=0;

	float isolevel=30;
	float col;
	
	int index=0;
		
		col=vertex_in[0].colour;
		if(col<isolevel)
			a=0;
		else
			a=1;
		col=vertex_in[1].colour;
		if(col<isolevel)
			b=0;
		else
			b=1;
		col=vertex_in[2].colour;
		if(col<isolevel)
			c=0;
		else
			c=1;
		col=vertex_in[3].colour;
		if(col<isolevel)
			d=0;
		else
			d=1;
			
	if(a==1 && b==0 && c==0 && d==0)
		index=1;
	if(a==0 && b==1 && c==0 && d==0)
		index=2;
	if(a==0 && b==0 && c==1 && d==0)
		index=3;
	if(a==0 && b==0 && c==0 && d==1)
		index=4;
	if(a==1 && b==1 && c==0 && d==0)
		index=5;
	if(a==1 && b==0 && c==1 && d==0)
		index=6;
	if(a==1 && b==0 && c==0 && d==1)
		index=7;
	if(a==0 && b==1 && c==1 && d==0)
		index=8;
	if(a==0 && b==0 && c==1 && d==1)
		index=9;
	if(a==0 && b==1 && c==0 && d==1)
		index=10;
	if(a==1 && b==1 && c==1 && d==0)
		index=11;
	if(a==1 && b==1 && c==0 && d==1)
		index=12;
	if(a==1 && b==0 && c==1 && d==1)
		index=13;
	if(a==0 && b==1 && c==1 && d==1)
		index=14;
	//if (p == ind)
		//return;
	switch (index) {

		// we don't do anything if everyone is inside or outside
	case 0:
			EndPrimitive();
			break;
	

		// only vert 0 is inside
	case 1:
		
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		break;

		// only vert 1 is inside
	case 2:
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[1].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[1].colour,vertex_in[2].colour), interpolate(gl_in[1].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[1].colour,vertex_in[2].colour), interpolate(gl_in[1].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[1].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[1].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[1].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		
		EndPrimitive();
		break;
		

		// only vert 2 is inside
	case 3:
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[2].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[2].colour,vertex_in[3].colour), interpolate(gl_in[2].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[2].colour,vertex_in[3].colour), interpolate(gl_in[2].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[2].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[1].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[1].colour,vertex_in[2].colour), interpolate(gl_in[1].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[1].colour,vertex_in[2].colour), interpolate(gl_in[1].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[1].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		break;
		

		// only vert 3 is inside
	case 4:
		gl_Position = vec4(interpolate(gl_in[3].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[3].colour,vertex_in[1].colour), interpolate(gl_in[3].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[3].colour,vertex_in[1].colour), interpolate(gl_in[3].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[3].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[2].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[2].colour,vertex_in[3].colour), interpolate(gl_in[2].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[2].colour,vertex_in[3].colour), interpolate(gl_in[2].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[2].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		break;
		

		// verts 0, 1 are inside
	case 5:
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[1].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[1].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[2].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[2].colour,vertex_in[1].colour), interpolate(gl_in[2].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[2].colour,vertex_in[1].colour), interpolate(gl_in[2].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[2].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[1].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[1].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		break;

		// verts 0, 2 are insideasd
	case 6:
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[1].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[1].colour,vertex_in[2].colour), interpolate(gl_in[1].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[1].colour,vertex_in[2].colour), interpolate(gl_in[1].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[1].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		
		gl_Position = vec4(interpolate(gl_in[2].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[2].colour,vertex_in[1].colour), interpolate(gl_in[2].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[2].colour,vertex_in[1].colour), interpolate(gl_in[2].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[2].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[3].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[3].colour,vertex_in[2].colour), interpolate(gl_in[3].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[3].colour,vertex_in[2].colour), interpolate(gl_in[3].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[3].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		break;


		// verts 0, 3 are inside
	case 7:
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[1].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[1].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		
		gl_Position = vec4(interpolate(gl_in[3].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[3].colour,vertex_in[1].colour), interpolate(gl_in[3].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[3].colour,vertex_in[1].colour), interpolate(gl_in[3].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[3].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[2].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[2].colour,vertex_in[3].colour), interpolate(gl_in[2].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[2].colour,vertex_in[3].colour), interpolate(gl_in[2].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[2].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		break;

		// verts 1, 2 are inside
	case 8:
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[1].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[1].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[1].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[1].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[3].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[3].colour,vertex_in[2].colour), interpolate(gl_in[3].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[3].colour,vertex_in[2].colour), interpolate(gl_in[3].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[3].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		break;
		
		// verts 2, 3 are inside
	case 9:
		gl_Position = vec4(interpolate(gl_in[3].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[3].colour,vertex_in[1].colour), interpolate(gl_in[3].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[3].colour,vertex_in[1].colour), interpolate(gl_in[3].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[3].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[1].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[1].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[1].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[1].colour,vertex_in[2].colour), interpolate(gl_in[1].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[1].colour,vertex_in[2].colour), interpolate(gl_in[1].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[1].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		break;

		// verts 1, 3 are inside
	case 10:
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[1].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[1].colour,vertex_in[2].colour), interpolate(gl_in[1].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[1].colour,vertex_in[2].colour), interpolate(gl_in[1].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[1].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		
		gl_Position = vec4(interpolate(gl_in[2].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[2].colour,vertex_in[1].colour), interpolate(gl_in[2].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[2].colour,vertex_in[1].colour), interpolate(gl_in[2].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[2].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[3].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[3].colour,vertex_in[2].colour), interpolate(gl_in[3].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[3].colour,vertex_in[2].colour), interpolate(gl_in[3].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[3].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		break;

		

		// verts 0, 1, 2 are inside
	case 11:
		gl_Position = vec4(interpolate(gl_in[3].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[3].colour,vertex_in[1].colour), interpolate(gl_in[3].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[3].colour,vertex_in[1].colour), interpolate(gl_in[3].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[3].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[3].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[3].colour,vertex_in[2].colour), interpolate(gl_in[3].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[3].colour,vertex_in[2].colour), interpolate(gl_in[3].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[3].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		break;
		//EndPrimitive();
		// verts 0, 1, 3 are inside
	case 12:
		gl_Position = vec4(interpolate(gl_in[2].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[2].colour,vertex_in[1].colour), interpolate(gl_in[2].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[2].colour,vertex_in[1].colour), interpolate(gl_in[2].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[2].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[2].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[2].colour,vertex_in[3].colour), interpolate(gl_in[2].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[2].colour,vertex_in[3].colour), interpolate(gl_in[2].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[2].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		break;
		
		//EndPrimitive();
		// verts 0, 2, 3 are inside
	case 13:
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[1].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[1].colour,vertex_in[3].colour), interpolate(gl_in[1].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[1].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[1].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[1].colour,vertex_in[2].colour), interpolate(gl_in[1].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[1].colour,vertex_in[2].colour), interpolate(gl_in[1].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[1].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		break;
		//EndPrimitive();

		// verts 1, 2, 3 are inside
	case 14:
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[1].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.y,gl_in[1].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[1].colour), interpolate(gl_in[0].gl_Position.z,gl_in[1].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[1].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[3].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.y,gl_in[3].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[3].colour), interpolate(gl_in[0].gl_Position.z,gl_in[3].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[3].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		gl_Position = vec4(interpolate(gl_in[0].gl_Position.x,gl_in[2].gl_Position.x,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.y,gl_in[2].gl_Position.y,isolevel,vertex_in[0].colour,vertex_in[2].colour), interpolate(gl_in[0].gl_Position.z,gl_in[2].gl_Position.z,isolevel,vertex_in[0].colour,vertex_in[2].colour),1.0); gl_Position = gWorld*gl_Position;colo = colormap(gl_Position.z); EmitVertex();
		EndPrimitive();
		break;
	
	default:
		EndPrimitive();
		break;
	}
}