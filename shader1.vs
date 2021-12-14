#version 410

in vec3 Position;

uniform mat4 g;

void main()
{
	
    gl_Position = g * vec4( Position, 1.0);
	
}
