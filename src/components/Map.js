import { useState, useEffect, useRef, Children, isValidElement, cloneElement } from 'react';

export const Map = ({ center, zoom, onClick, children }) => {
  const ref = useRef(null);
  const [ map, setMap ] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ ref, map ]);

  useEffect(() => {
    if (map) {
      window.google.maps.event.clearListeners(map, 'click')

      if (onClick) {
        map.addListener('click', onClick);
      }
    }
  }, [ map, onClick ]);

  return <>
    <div className='map' ref={ref} />
    {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // childコンポーネントにmap propsを渡す
          return cloneElement(child, { map });
        }
      })}
  </>;
}