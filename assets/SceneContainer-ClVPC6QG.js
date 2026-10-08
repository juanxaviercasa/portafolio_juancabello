import{r as e}from"./rolldown-runtime-hePW80VL.js";import{a as t,c as n,d as r,f as i,h as a,i as o,l as s,n as c,o as l,r as u,s as d,t as f,u as p}from"./three-vendor-DN3hZSKI.js";import{t as m}from"./index-D_J74Ddf.js";var h=e(a(),1);function g(e=128,n=128,r=1.3,i=.55){let a=new t,s=(e+1)*(n+1),c=new Float32Array(s*3),l=new Float32Array(s*3),u=new Float32Array(s*2),d=[],f=0,p=0;for(let t=0;t<=e;t++){let a=t/e*Math.PI*2;for(let o=0;o<=n;o++){let s=o/n*Math.PI*2,d=Math.cos(a),m=Math.sin(a),h=Math.cos(s),g=Math.sin(s),_=(r+i*d)*h,v=(r+i*d)*g,y=i*m;c[f]=_,c[f+1]=v,c[f+2]=y;let b=d*h,x=d*g,S=m;l[f]=b,l[f+1]=x,l[f+2]=S,u[p]=o/n,u[p+1]=t/e,f+=3,p+=2}}for(let t=1;t<=e;t++)for(let e=1;e<=n;e++){let r=(n+1)*t+e-1,i=(n+1)*(t-1)+e-1,a=(n+1)*(t-1)+e,o=(n+1)*t+e;d.push(r,i,o),d.push(i,a,o)}return a.setIndex(d),a.setAttribute(`position`,new o(c,3)),a.setAttribute(`normal`,new o(l,3)),a.setAttribute(`uv`,new o(u,2)),a}var _=new p(0,0);typeof window<`u`&&window.addEventListener(`pointermove`,e=>{_.x=e.clientX/window.innerWidth*2-1,_.y=-(e.clientY/window.innerHeight)*2+1},{passive:!0});var v={cyan:{shadow:new l(`#083344`),primary:new l(`#06b6d4`),highlight:new l(`#38bdf8`),accent:new l(`#a5f3fc`)},violet:{shadow:new l(`#3b0764`),primary:new l(`#8b5cf6`),highlight:new l(`#c084fc`),accent:new l(`#e9d5ff`)},amber:{shadow:new l(`#451a03`),primary:new l(`#f59e0b`),highlight:new l(`#fbbf24`),accent:new l(`#fef3c7`)},emerald:{shadow:new l(`#022c22`),primary:new l(`#10b981`),highlight:new l(`#34d399`),accent:new l(`#a7f3d0`)}},y={cyan:{shadow:new l(`#0e7490`),primary:new l(`#0284c7`),highlight:new l(`#38bdf8`),accent:new l(`#bae6fd`)},violet:{shadow:new l(`#581c87`),primary:new l(`#7c3aed`),highlight:new l(`#a855f7`),accent:new l(`#e9d5ff`)},amber:{shadow:new l(`#78350f`),primary:new l(`#d97706`),highlight:new l(`#f59e0b`),accent:new l(`#fde68a`)},emerald:{shadow:new l(`#064e3b`),primary:new l(`#059669`),highlight:new l(`#10b981`),accent:new l(`#a7f3d0`)}},b=i(),x=`
  uniform float uTime;
  uniform float uSpeed;
  uniform float uHarmonics;
  uniform float uAmplitude;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform int uMode; // 0: phoenix wings, 1: fourier sheet, 2: spherical harmonic, 3: klein/atractor

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;
  varying vec3 vViewPosition;
  varying float vFlameIntensity;

  #define PI 3.14159265358979323846

  void main() {
    vUv = uv;
    vec3 pos = position;
    vec3 norm = normal;

    float t = uTime * uSpeed * 0.9;
    float disp = 0.0;

    // Síntesis de armónicos 357 acumulativa (armónicos impares primarios 3, 5, 7)
    float h = clamp(uHarmonics, 1.0, 8.0);
    for (float k = 1.0; k <= 8.0; k += 1.0) {
      if (k > h) break;
      float weight = 1.0 / (k * 0.85);
      float phase = t + k * 0.628;
      float wave = sin(k * uv.x * PI * 2.0 + phase) * cos(k * uv.y * PI * 2.0 + phase * 0.7);
      disp += weight * wave;
    }

    disp *= uAmplitude;

    // Reactividad al cursor (campo magnético vectorial del Fénix)
    float mouseDistance = length(pos.xy - uMouse * 2.5);
    float mouseInfluence = smoothstep(2.8, 0.0, mouseDistance) * 0.35;
    disp += mouseInfluence * sin(uTime * 3.5 + pos.x * 2.5);

    // Morfología del Fénix Fractal y Variedades Topológicas
    if (uMode == 0) {
      // MODO FÉNIX: Modulación de alas paramétricas y batir armónico
      float wingSpread = abs(pos.x) * 0.8;
      float wingFlap = sin(t * 2.2 + abs(pos.x) * 1.5) * wingSpread * 0.45;
      float featherRipple = sin(pos.y * 8.0 + t * 3.0) * 0.08 * uAmplitude;
      
      pos.y += wingFlap + featherRipple;
      pos.z += sin(pos.x * PI + t) * wingSpread * 0.25;
      pos += norm * (disp * 1.25);
    } else if (uMode == 1) {
      // Sábana de Fourier (Ondas armónicas superpuestas)
      pos.z += disp * 2.4;
    } else if (uMode == 2) {
      // Armónico esférico de energía
      pos = normalize(pos) * (1.65 + disp * 1.6);
    } else if (uMode == 3) {
      // Variedad de Klein / Atractor caótico
      float pinch = sin(uv.y * PI) * 0.45;
      pos += norm * (disp + pinch);
    }

    // Intensidad térmica para bioluminiscencia (crestas de alas y ápices más calientes)
    vFlameIntensity = smoothstep(-0.25, 0.45, disp) + abs(pos.x) * 0.2;
    vDisplacement = disp;
    vPosition = pos;
    vNormal = normalize(normalMatrix * norm);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`,S=`
  uniform vec3 uColorShadow;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorHighlight;
  uniform vec3 uColorAccent;
  uniform float uTime;
  uniform float uScroll;
  uniform float uIsLight;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;
  varying vec3 vViewPosition;
  varying float vFlameIntensity;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Factor de altura / desplazamiento normalizado de 0.0 a 1.0
    float hFactor = clamp(vFlameIntensity, 0.0, 1.0);

    // Degradado monocromático continuo del MISMO color elegido (sin superposición):
    // 0.0 -> sombra profunda del color
    // 0.5 -> cuerpo medio vibrante del color
    // 1.0 -> cresta luminosa del color
    vec3 baseColor;
    if (hFactor < 0.5) {
      baseColor = mix(uColorShadow, uColorPrimary, hFactor * 2.0);
    } else {
      baseColor = mix(uColorPrimary, uColorHighlight, (hFactor - 0.5) * 2.0);
    }

    // Iluminación difusa suave
    vec3 lightDir = normalize(vec3(1.0, 2.2, 3.0));
    float diff = max(dot(normal, lightDir), 0.0) * 0.6 + 0.4;
    
    // Iluminación especular
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 30.0) * 0.7;

    // Fresnel óptico en los bordes con el tono acento del mismo color
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.5);

    vec3 finalColor;

    if (uIsLight > 0.5) {
      // MODO CLARO: degradado nítido con alto contraste
      finalColor = baseColor * (diff * 0.75 + 0.35);
      finalColor += fresnel * uColorHighlight * 0.5;
      finalColor += spec * uColorAccent * 0.4;
      gl_FragColor = vec4(finalColor, 0.95);
    } else {
      // MODO OSCURO: bioluminiscencia pura del color seleccionado
      finalColor = baseColor * diff;
      finalColor += fresnel * uColorAccent * 1.35;
      finalColor += spec * uColorHighlight * 0.75;
      // Pulso armónico sutil
      float pulse = 0.96 + 0.04 * sin(uTime * 2.0);
      finalColor *= pulse;
      gl_FragColor = vec4(finalColor, 0.92);
    }
  }
`,C=()=>{let e=(0,h.useRef)(null),t=(0,h.useRef)(null),r=m(e=>e.labParams),i=m(e=>e.scrollProgress),a=m(e=>e.theme)===`light`,o=(0,h.useMemo)(()=>{switch(r.surfaceMode){case`clifford`:return 0;case`fourier`:return 1;case`spherical`:return 2;case`klein`:return 3;default:return 0}},[r.surfaceMode]),l=(0,h.useMemo)(()=>r.surfaceMode===`fourier`?new n(3.6,3.6,96,96):r.surfaceMode===`spherical`?new s(1.5,96,96):g(128,128,1.35,.55),[r.surfaceMode]),u=(0,h.useMemo)(()=>{let e=a?y:v;return e[r.colorTheme]||e.cyan},[a,r.colorTheme]),f=(0,h.useMemo)(()=>({uTime:{value:0},uSpeed:{value:r.speed},uHarmonics:{value:r.harmonics},uAmplitude:{value:r.amplitude},uScroll:{value:0},uMouse:{value:new p(0,0)},uMode:{value:o},uIsLight:{value:+!!a},uColorShadow:{value:u.shadow},uColorPrimary:{value:u.primary},uColorHighlight:{value:u.highlight},uColorAccent:{value:u.accent}}),[]);return c((n,s)=>{if(!t.current||!e.current)return;t.current.uniforms.uTime.value+=s,t.current.uniforms.uSpeed.value=r.speed,t.current.uniforms.uHarmonics.value=r.harmonics,t.current.uniforms.uAmplitude.value=r.amplitude,t.current.uniforms.uMode.value=o,t.current.uniforms.uScroll.value=i,t.current.uniforms.uIsLight.value=+!!a;let c=_.x,l=_.y;t.current.uniforms.uMouse.value.lerp(_,.06),t.current.uniforms.uColorShadow.value.copy(u.shadow),t.current.uniforms.uColorPrimary.value.copy(u.primary),t.current.uniforms.uColorHighlight.value.copy(u.highlight),t.current.uniforms.uColorAccent.value.copy(u.accent),e.current.rotation.x=d.lerp(e.current.rotation.x,.32+i*Math.PI*1.5+l*.25,.04),e.current.rotation.y=d.lerp(e.current.rotation.y,n.clock.elapsedTime*.16+i*Math.PI*2+c*.35,.04)}),(0,b.jsx)(`group`,{position:[0,0,0],children:(0,b.jsx)(`mesh`,{ref:e,geometry:l,children:(0,b.jsx)(`shaderMaterial`,{ref:t,vertexShader:x,fragmentShader:S,uniforms:f,transparent:!0,wireframe:r.wireframe,side:2})})})},w=3500,T=1500;function E(e){let t=new Float32Array(e*3),n=new Float32Array(e*4),r=new Float32Array(e*2),i=35711,a=()=>(i=i*16807%2147483647,(i-1)/2147483646);for(let i=0;i<e;i++){let e=i*3,o=i*4,s=i*2,c=a()<.68,l=0,u=0,d=0,f=0,p=0;if(c){let e=a()>.5?1:-1,t=.5+a()*2.6,n=(a()-.5)*1.4;l=e*(t*Math.cos(n)+.3),u=t*Math.sin(n)*.7+(a()-.5)*.9,d=(a()-.5)*1.2+Math.sin(t*2)*.4,f=Math.min(1,t/2.8),p=Math.max(0,(t-1.6)/1.5)}else{let e=(a()-.5)*3.6,t=(.2+a()*.8)*(1.2-Math.abs(e)*.2),n=a()*Math.PI*2;l=t*Math.cos(n),u=e,d=t*Math.sin(n),f=Math.min(1,1-Math.abs(e)/2.2),p=Math.max(0,(.45-t)/.45)}t[e]=l,t[e+1]=u,t[e+2]=d,n[o]=a()*Math.PI*2,n[o+1]=.6+a()*1.2,n[o+2]=+!!c,n[o+3]=.6+a()*1,r[s]=f,r[s+1]=p}return{positions:t,randoms:n,factors:r}}var{positions:D,randoms:O,factors:k}=E(w),A=`
  uniform float uTime;
  uniform float uSpeed;
  uniform float uHarmonics;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  uniform vec3 uColorShadow;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorHighlight;
  uniform vec3 uColorAccent;

  attribute vec4 aRandom;
  attribute vec2 aFactor; // [colorMix, accentIntensity]

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float colorMix = aFactor.x;
    float accentIntensity = aFactor.y;

    // Degradado monocromático en las partículas del color elegido (sin superposición)
    vec3 pBase;
    if (colorMix < 0.5) {
      pBase = mix(uColorShadow, uColorPrimary, colorMix * 2.0);
    } else {
      pBase = mix(uColorPrimary, uColorHighlight, (colorMix - 0.5) * 2.0);
    }
    vec3 particleColor = mix(pBase, uColorAccent, pow(accentIntensity, 2.0));
    vColor = particleColor;

    vec3 pos = position;
    float phase = aRandom.x;
    float pSpeed = aRandom.y * uSpeed;
    float isWing = aRandom.z;
    float pScale = aRandom.w;

    float t = uTime * pSpeed * 0.8;

    // Batir de alas de energía y remolino caótico del Fénix
    if (isWing > 0.5) {
      float flap = sin(t * 2.2 + abs(pos.x) * 1.6 + phase) * 0.35 * (abs(pos.x) * 0.6);
      pos.y += flap;
      pos.z += cos(t * 1.8 + phase) * 0.2;
    } else {
      // Ascensión de chispas
      pos.y += sin(t * 2.5 + phase) * 0.35;
      pos.x += cos(t * 1.6 + pos.y * 2.0) * 0.15;
    }

    // Interacción dinámica con el mouse (repulsión magnética)
    vec2 mDiff = pos.xy - uMouse * 2.8;
    float mDist = length(mDiff);
    if (mDist < 2.2) {
      float force = (2.2 - mDist) * 0.35;
      pos.xy += normalize(mDiff) * force;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Atenuación de tamaño por distancia de cámara y pulsación armónica
    float harmonicPulse = 1.0 + sin(uTime * 3.0 + phase) * 0.3;
    gl_PointSize = (18.0 * pScale * harmonicPulse * uPixelRatio) / -mvPosition.z;

    vAlpha = smoothstep(0.1, 0.4, pScale);
  }
`,j=`
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uIsLight;

  void main() {
    // Partícula esférica con halo suave y decaimiento radial
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    float intensity = smoothstep(0.5, 0.05, dist);
    // Destello interior incandescente
    float core = smoothstep(0.2, 0.0, dist) * 0.5;

    vec3 finalColor = vColor + vec3(core);

    float alpha = intensity * (uIsLight > 0.5 ? 0.75 : 0.85);
    gl_FragColor = vec4(finalColor, alpha);
  }
`,M=()=>{let e=(0,h.useRef)(null),n=(0,h.useRef)(null),r=m(e=>e.labParams),i=m(e=>e.scrollProgress),a=m(e=>e.theme)===`light`,[s,l]=(0,h.useState)(w);(0,h.useEffect)(()=>{let e=()=>{l(window.innerWidth<640?T:w)};return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let u=(0,h.useMemo)(()=>{let e=a?y:v;return e[r.colorTheme]||e.cyan},[a,r.colorTheme]),d=(0,h.useMemo)(()=>{let e=new t,n=D.slice(0,s*3),r=O.slice(0,s*4),i=k.slice(0,s*2);return e.setAttribute(`position`,new o(n,3)),e.setAttribute(`aRandom`,new o(r,4)),e.setAttribute(`aFactor`,new o(i,2)),e},[s]),f=(0,h.useMemo)(()=>({uTime:{value:0},uSpeed:{value:r.speed},uHarmonics:{value:r.harmonics},uScroll:{value:0},uMouse:{value:new p(0,0)},uIsLight:{value:+!!a},uPixelRatio:{value:typeof window<`u`?Math.min(window.devicePixelRatio,2):1},uColorShadow:{value:u.shadow},uColorPrimary:{value:u.primary},uColorHighlight:{value:u.highlight},uColorAccent:{value:u.accent}}),[]);return c((t,o)=>{n.current&&e.current&&(n.current.uniforms.uTime.value+=o,n.current.uniforms.uSpeed.value=r.speed,n.current.uniforms.uHarmonics.value=r.harmonics,n.current.uniforms.uScroll.value=i,n.current.uniforms.uIsLight.value=+!!a,n.current.uniforms.uMouse.value.lerp(_,.08),n.current.uniforms.uColorShadow.value.copy(u.shadow),n.current.uniforms.uColorPrimary.value.copy(u.primary),n.current.uniforms.uColorHighlight.value.copy(u.highlight),n.current.uniforms.uColorAccent.value.copy(u.accent),e.current.rotation.y=t.clock.elapsedTime*.08+i*Math.PI,e.current.rotation.x=i*.5)}),(0,b.jsx)(`points`,{ref:e,geometry:d,children:(0,b.jsx)(`shaderMaterial`,{ref:n,vertexShader:A,fragmentShader:j,uniforms:f,transparent:!0,depthWrite:!1,blending:2})})},N=()=>{let e=m(e=>e.scrollProgress),{size:t}=u(),n=(0,h.useRef)(new r(0,0,4.8)),i=(0,h.useRef)(new r(0,0,0));return c(a=>{let o=e,s=_.x*.4,c=_.y*.3,l=t.width<640?10.2:t.width<1024?8:7.35;o<.25?(n.current.set(0+s,.15+c,l),i.current.set(0,0,0)):o<.55?(n.current.set(1.4+s*.5,.3+c*.5,l*.92),i.current.set(-.3,0,0)):o<.8?(n.current.set(0+s*.6,.1+c*.6,l*.82),i.current.set(0,0,0)):(n.current.set(-1.1+s*.5,.8+c*.5,l*.96),i.current.set(.2,0,0)),a.camera.position.lerp(n.current,.04);let u=new r;a.camera.getWorldDirection(u),a.camera.lookAt(i.current)}),null},P=({isLight:e})=>{let t=(0,h.useRef)(null),n=m(e=>e.labParams);c(()=>{t.current&&(t.current.position.x=d.lerp(t.current.position.x,_.x*4,.08),t.current.position.y=d.lerp(t.current.position.y,_.y*3.5,.08))});let r=(0,h.useMemo)(()=>{switch(n.colorTheme){case`cyan`:return e?`#0284c7`:`#38bdf8`;case`violet`:return e?`#7c3aed`:`#c084fc`;case`amber`:return e?`#d97706`:`#fbbf24`;case`emerald`:return e?`#059669`:`#34d399`;default:return`#38bdf8`}},[e,n.colorTheme]);return(0,b.jsx)(`pointLight`,{ref:t,position:[0,0,3.8],intensity:e?1.4:2,distance:14,color:r})},F=()=>{let[e]=(0,h.useState)(()=>{if(typeof window>`u`)return!0;try{let e=document.createElement(`canvas`);return!!(e.getContext(`webgl2`)||e.getContext(`webgl`))}catch{return!1}}),[t,n]=(0,h.useState)(!1),r=m(e=>e.theme)===`light`;(0,h.useEffect)(()=>{let e=()=>{n(window.innerWidth<640)};return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let i=m(e=>e.labParams),a=(0,h.useMemo)(()=>{switch(i.colorTheme){case`cyan`:return r?`#0284c7`:`#06b6d4`;case`violet`:return r?`#7c3aed`:`#8b5cf6`;case`amber`:return r?`#d97706`:`#f59e0b`;case`emerald`:return r?`#059669`:`#10b981`;default:return`#06b6d4`}},[r,i.colorTheme]),o=(0,h.useMemo)(()=>{switch(i.colorTheme){case`cyan`:return r?`#38bdf8`:`#a5f3fc`;case`violet`:return r?`#a855f7`:`#e9d5ff`;case`amber`:return r?`#f59e0b`:`#fef3c7`;case`emerald`:return r?`#10b981`:`#a7f3d0`;default:return`#a5f3fc`}},[r,i.colorTheme]);return e?(0,b.jsx)(`div`,{className:`scene-stage`,"aria-hidden":`true`,children:(0,b.jsx)(f,{dpr:t?1:[1,1.5],camera:{fov:45,position:[0,0,4.8],near:.1,far:50},gl:{antialias:!t,alpha:!0,powerPreference:`high-performance`},className:`w-full h-full`,children:(0,b.jsxs)(h.Suspense,{fallback:null,children:[(0,b.jsx)(`ambientLight`,{intensity:r?.8:.45}),(0,b.jsx)(`directionalLight`,{position:[5,6,4],intensity:r?1.5:1.3,color:`#ffffff`}),(0,b.jsx)(`pointLight`,{position:[-4,-3,-2],intensity:r?.9:1.1,color:a}),(0,b.jsx)(`pointLight`,{position:[3,-4,3],intensity:r?.7:.8,color:o}),(0,b.jsx)(P,{isLight:r}),(0,b.jsx)(N,{}),(0,b.jsx)(C,{}),(0,b.jsx)(M,{})]})})}):(0,b.jsx)(`div`,{className:`scene-stage math-grid-bg`,"aria-hidden":`true`,children:(0,b.jsx)(`div`,{className:`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse`})})};export{F as SceneContainer};