import React, { useState, useEffect } from 'react';
import ReactFlow, { MiniMap, Controls } from 'react-flow-renderer';

const Workflow = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    fetch('https://3f096af4-e0bf-4789-be5e-4c859cde5ad7.mock.pstmn.io/delivered')
      .then(response => response.json())
      .then(data => {
        setElements(data.elements);
      })
      .catch(error => console.error('Error fetching workflow data:', error));
  }, []);

  return (
    <div style={{ height: '600px' }}>
      <ReactFlow elements={elements}>
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Workflow;