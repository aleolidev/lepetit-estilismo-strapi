import React from 'react';
import { Box, Typography, Tabs, TextInput, Button, Flex, Field } from '@strapi/design-system';
import { useClientInfoContext } from '../contexts/client-info-context';
import { Client } from '../../../types';

export const ClientSelector = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedClient,
    newClient,
    handleNewClientChange,
    handleClientSelect,
    handleCreateNewClient,
    isNewClientValid,
  } = useClientInfoContext();

  // Mock clients data - replace with actual data from your API
  const clients: Client[] = [
    { id: '1', name: 'John Doe', phone: '+1234567890', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', phone: '+0987654321', email: 'jane@example.com' },
  ];

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery)
  );

  return (
    <Box paddingBottom={6}>
      <Box padding={4} background="neutral0" shadow="tableShadow" hasRadius>
        <Typography variant="delta" as="h2">
          Client Information
        </Typography>
        <Box paddingTop={4}>
          <Tabs.Root defaultValue="existing">
            <Tabs.List aria-label="Client selection">
              <Tabs.Trigger value="existing">Existing Client</Tabs.Trigger>
              <Tabs.Trigger value="new">New Client</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="existing">
              <Box padding={4}>
                <Field.Root>
                  <Field.Label>Search clients</Field.Label>
                  <TextInput
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchQuery(e.target.value)
                    }
                  />
                </Field.Root>
                <Box paddingTop={4}>
                  {filteredClients.map((client) => (
                    <Box
                      key={client.id}
                      padding={4}
                      background={selectedClient?.id === client.id ? 'primary100' : 'neutral0'}
                      hasRadius
                      style={{
                        cursor: 'pointer',
                        border: `1px solid ${selectedClient?.id === client.id ? '#4945FF' : '#DCDCE4'}`,
                        marginBottom: '8px',
                        transition: 'all 0.2s ease-in-out',
                      }}
                      onClick={() => handleClientSelect(client)}
                    >
                      <Typography variant="delta">{client.name}</Typography>
                      <Typography variant="pi" textColor="neutral600">
                        {client.phone}
                      </Typography>
                      {client.email && (
                        <Typography variant="pi" textColor="neutral600">
                          {client.email}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Tabs.Content>
            <Tabs.Content value="new">
              <Box padding={4}>
                <Flex direction="column" gap={4}>
                  <Field.Root required>
                    <Field.Label>Name</Field.Label>
                    <TextInput
                      placeholder="Client name"
                      value={newClient.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleNewClientChange('name', e.target.value)
                      }
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Phone</Field.Label>
                    <TextInput
                      placeholder="Phone number"
                      value={newClient.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleNewClientChange('phone', e.target.value)
                      }
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <TextInput
                      placeholder="Email address"
                      value={newClient.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleNewClientChange('email', e.target.value)
                      }
                    />
                  </Field.Root>

                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      variant="default"
                      onClick={handleCreateNewClient}
                      disabled={!isNewClientValid}
                      size="L"
                    >
                      Create Client
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>
    </Box>
  );
};
