import { List, ListItem, ListItemText } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Stores', path: '/stores' },
    { label: 'SKUs', path: '/skus' },
    { label: 'Planning', path: '/planning' },
    { label: 'Chart', path: '/chart' },
  ];

  return (
    <div className='sidebar'>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              cursor: 'pointer',
              backgroundColor: location.pathname === item.path ? '#333' : 'transparent',
              color: location.pathname === item.path ? '#fff' : 'inherit',
              borderRadius: '5px',
              marginBottom: '5px',
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
