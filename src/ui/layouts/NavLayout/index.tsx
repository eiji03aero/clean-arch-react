import * as React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet, Link } from 'react-router-dom';

import { useRestoreSession } from '@/application/usecases/useRestoreSession';
import { useLogout } from '@/application/usecases/useLogout';
import { useSessionStorage } from '@/services/adapters/useSessionStorage';

export function NavLayout() {
  const [initialized, setInitialized] = React.useState(false);

  const sessionStorage = useSessionStorage();
  const { tryRestoreSession } = useRestoreSession();
  const { logout } = useLogout();

  React.useEffect(() => {
    if (initialized) {
      return;
    }

    const handler = async () => {
      await tryRestoreSession();
      setInitialized(true);
    };

    handler();
  }, [initialized, tryRestoreSession]);

  const renderNavItem = (params: {
    href: string;
    onClick?: VoidFunction;
    label: string;
  }) => {
    return (
      <Link to={params.href} onClick={params.onClick}>
        <Box px={3} py={2} color="white">
          {params.label}
        </Box>
      </Link>
    );
  };

  const renderContent = () => {
    if (!initialized) {
      return null;
    }

    return <Outlet />;
  };

  const isLoggedIn = sessionStorage.isLoggedIn();

  return (
    <Box display="flex" width="100%" height="100%">
      <Box
        display="flex"
        flexDir="column"
        width="240px"
        height="100%"
        borderRight="1px solid grey"
        bg="#333344"
      >
        <Box px={3} py={2} mb={2} color="white">
          React clean arch
        </Box>
        {renderNavItem({ href: '/', label: 'Top' })}

        <Box flex={1} minHeight={0}></Box>

        {!isLoggedIn && renderNavItem({ href: '/login', label: 'Login' })}
        {isLoggedIn && sessionStorage.currentUser && (
          <>
            {renderNavItem({ href: '#', onClick: logout, label: 'Logout' })}
            <Box px={3} py={2} mb={2} color="white">
              {sessionStorage.currentUser.name}
            </Box>
          </>
        )}

        <Box py={4}></Box>
      </Box>

      <Box flex={1}>{renderContent()}</Box>
    </Box>
  );
}
