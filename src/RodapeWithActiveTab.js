import React from 'react';
import { useLocation } from 'react-router-dom';
import Rodape from './componentes/rodape';

function RodapeWithActiveTab() {
  const location = useLocation();

  return (
    <>
      <Rodape activeTab={location.pathname} />
    </>
  );
}

export default RodapeWithActiveTab;
