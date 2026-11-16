import { useState, useEffect, useRef } from 'react';
import { MascotController } from '../mascot/MascotController';
import { MASCOT_STATES, POSE_CONFIGS } from '../mascot/MascotAnimations';

export function useMascotState(initialState = MASCOT_STATES.WELCOME) {
  const controllerRef = useRef(null);
  if (!controllerRef.current) {
    controllerRef.current = new MascotController(initialState);
  }

  const [currentState, setCurrentState] = useState(initialState);
  const [poseConfig, setPoseConfig] = useState(POSE_CONFIGS[initialState]);

  useEffect(() => {
    const unsubscribe = controllerRef.current.subscribe((state, config) => {
      setCurrentState(state);
      setPoseConfig(config);
    });
    return unsubscribe;
  }, []);

  const setMascotState = (state, force = false) => {
    if (controllerRef.current) {
      controllerRef.current.setState(state, force);
    }
  };

  return {
    currentState,
    poseConfig,
    setMascotState,
    controller: controllerRef.current
  };
}
