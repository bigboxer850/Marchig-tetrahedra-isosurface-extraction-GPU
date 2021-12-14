#version 410

in vec3 Position;
in float Colour;


out VS_OUT {
    float colour;
    
} vs_out;


void main()
{
   
    gl_Position = vec4( Position, 1.0);
  
    vs_out.colour=Colour;

}
