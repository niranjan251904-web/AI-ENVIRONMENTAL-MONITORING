import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { hotspotData } from '../data/hotspotData';

const GlobalImpactGlobe = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<any>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 25;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Globe
    const globeGeometry = new THREE.SphereGeometry(10, 64, 64);
    
    // Fallback wireframe or solid material if texture not available yet
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0xEAF4FB, // Pastel Blue tint
      emissive: 0x0D1B2A,
      specular: 0x5BB8F5,
      shininess: 25,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Add solid core
    const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const core = new THREE.Mesh(new THREE.SphereGeometry(9.8, 64, 64), coreMaterial);
    scene.add(core);

    // Atmosphere Glow
    const atmosphereGeometry = new THREE.SphereGeometry(10.5, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x5BB8F5,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Hotspots
    const markers: THREE.Mesh[] = [];
    const markerDataMap = new Map();

    const latLongToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = (radius * Math.sin(phi) * Math.sin(theta));
      const y = (radius * Math.cos(phi));

      return new THREE.Vector3(x, y, z);
    };

    hotspotData.forEach(hotspot => {
      const position = latLongToVector3(hotspot.lat, hotspot.lng, 10.1);
      
      const markerGeometry = new THREE.SphereGeometry(0.2, 16, 16);
      const color = hotspot.status === 'critical' ? 0xff4d4d : hotspot.status === 'warning' ? 0xffc107 : 0x5BB8F5;
      const markerMaterial = new THREE.MeshBasicMaterial({ color });
      
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(position);
      
      // Make them glow
      const glowGeo = new THREE.SphereGeometry(0.4, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      marker.add(glow);

      globe.add(marker);
      markers.push(marker);
      markerDataMap.set(marker, hotspot);
    });

    // Raycaster for hover interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      setTooltipPos({ x: event.clientX, y: event.clientY });
    };

    container.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      
      // Pulse hotspots
      markers.forEach(marker => {
        const scale = 1 + Math.sin(time * 3 + marker.position.x) * 0.3;
        marker.children[0].scale.set(scale, scale, scale);
      });

      controls.update();

      // Check raycaster
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markers);
      
      if (intersects.length > 0) {
        setHoveredHotspot(markerDataMap.get(intersects[0].object));
        container.style.cursor = 'pointer';
      } else {
        setHoveredHotspot(null);
        container.style.cursor = 'default';
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      container.removeChild(renderer.domElement);
      // Cleanup geometries and materials
      globeGeometry.dispose();
      globeMaterial.dispose();
      coreMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      markers.forEach(m => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <section id="monitor" className="relative w-full h-[80vh] min-h-[600px] bg-white overflow-hidden py-20 flex items-center justify-center">
      <div className="absolute inset-0 max-w-7xl mx-auto px-6 pt-10 pointer-events-none z-10">
        <h2 className="text-4xl font-display font-bold text-atmos-navy">Global Impact Matrix</h2>
        <p className="text-atmos-muted font-sans mt-2 max-w-md">Live AI-monitored pollution hotspots updating in real time.</p>
      </div>

      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {hoveredHotspot && (
        <div 
          className="fixed z-50 glass p-4 pointer-events-none transform -translate-x-1/2 -translate-y-[120%]"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <div className="flex items-center justify-between mb-2 gap-4">
            <span className="font-display font-bold text-atmos-navy">{hoveredHotspot.city}</span>
            <span className={`text-xs px-2 py-1 rounded border overflow-hidden uppercase font-bold
              ${hoveredHotspot.status === 'critical' ? 'text-red-500 border-red-200 bg-red-50' : 
                hoveredHotspot.status === 'warning' ? 'text-amber-500 border-amber-200 bg-amber-50' : 
                'text-atmos-blue border-atmos-fog bg-atmos-sky'}
            `}>
              {hoveredHotspot.status}
            </span>
          </div>
          <div className="font-mono text-xl flex items-center gap-2">
            AQI: {hoveredHotspot.aqi}
            {hoveredHotspot.trend === 'down' ? <span className="text-red-500 text-sm">↑</span> :
             hoveredHotspot.trend === 'improving' ? <span className="text-atmos-blue text-sm">↓</span> : 
             <span className="text-gray-400 text-sm">→</span>}
          </div>
        </div>
      )}
    </section>
  );
};

export default GlobalImpactGlobe;
