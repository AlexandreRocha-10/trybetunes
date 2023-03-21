/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { Container, Content } from './styles';
import { 
  FaTimes, 
  FaHeart, 
  FaRegSun, 
  FaUserAlt,
  FaMusic,
  FaRegUserCircle,
  FaSearchPlus
} from 'react-icons/fa';

import SidebarItem from '../SidebarItem';

const Sidebar = ({ active }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    getUserName();
  }, []);

  async function getUserName() {
    const userName = await getUser();
    setName(userName.name);
  }

  const closeSidebar = () => {
    active(false)
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <Content>
        <SidebarItem Icon={FaUserAlt} Text={ name } />
        <Link to="/search"><SidebarItem Icon={FaSearchPlus} Text="Search" /></Link>
        <Link to="/album/:id"><SidebarItem Icon={FaMusic} Text="Album" /></Link>
        <Link to="/favorites"><SidebarItem Icon={FaHeart} Text="Favorites" /></Link>
        <Link to="/profile"><SidebarItem Icon={FaRegUserCircle} Text="Profile" /></Link>
        <Link to="/profile/edit"><SidebarItem Icon={FaRegSun} Text="Profile Edit" /></Link>
      </Content>
    </Container>
  )
}

export default Sidebar