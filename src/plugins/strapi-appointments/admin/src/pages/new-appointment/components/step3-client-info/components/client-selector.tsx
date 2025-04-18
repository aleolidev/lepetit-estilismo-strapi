import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  TextInput,
  Button,
  Flex,
  Grid,
  Field,
  Loader,
  Searchbar,
} from '@strapi/design-system';
import { useClientInfoContext } from '../contexts/client-info-context';
import { Client } from '../../../types';
import { CardContent } from '@strapi/design-system';
import { CardTitle } from '@strapi/design-system';
import { Card } from '@strapi/design-system';

export const ClientSelector = () => {
  // Get context values
  const {
    selectedClient,
    clients,
    isLoadingClients,
    clientError,
    newClient,
    handleNewClientChange,
    handleClientSelect,
    handleCreateNewClient,
    isNewClientValid,
    searchClients,
  } = useClientInfoContext();

  // Local state for search input
  const [searchText, setSearchText] = useState('');

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);

    // Only search if text is at least 3 characters
    if (text.length >= 3) {
      searchClients(text);
    }
  };

  // Handle selection of a client
  const handleSelectClient = (client: Client) => {
    if (selectedClient?.id === client.id) {
      handleClientSelect(null);
    } else {
      handleClientSelect(client);
    }
  };

  // Render search results
  const renderSearchResults = () => {};

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
                  <Searchbar
                    value={searchText}
                    onChange={handleSearchChange}
                    onClear={() => setSearchText('')}
                    placeholder="Search by name, phone or email..."
                  />
                </Field.Root>

                {/* Search Results Container */}
                <Box marginTop={4} hasRadius>
                  <ClientSearchResults
                    selectedClient={selectedClient}
                    isLoadingClients={isLoadingClients}
                    clientError={clientError}
                    clients={clients}
                    searchText={searchText}
                    handleSelectClient={handleSelectClient}
                  />
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

const ClientSearchResults = ({
  selectedClient,
  isLoadingClients,
  clientError,
  clients,
  searchText,
  handleSelectClient,
}: {
  selectedClient: Client | null;
  isLoadingClients: boolean;
  clientError: Error | null;
  clients: Client[];
  searchText: string;
  handleSelectClient: (client: Client) => void;
}) => {
  if (isLoadingClients) {
    return (
      <Box padding={4} textAlign="center">
        <Flex justifyContent="center" alignItems="center">
          <Loader />
        </Flex>
      </Box>
    );
  }

  if (clientError) {
    return (
      <Box padding={4} textAlign="center">
        <Typography textColor="danger600">Error loading clients. Please try again.</Typography>
      </Box>
    );
  }

  if (clients.length === 0 && searchText.length >= 3) {
    return (
      <Box padding={4} textAlign="center">
        <Typography>No clients found. Try a different search or create a new client.</Typography>
      </Box>
    );
  }

  if (searchText.length < 3) {
    return (
      <Box padding={4} textAlign="center">
        <Typography textColor="neutral600">Type at least 3 characters to search</Typography>
      </Box>
    );
  }

  return (
    <Grid.Root gap={4}>
      {clients.map((client) => (
        <Grid.Item key={client.id} s={12} m={6} col={4}>
          <button
            style={{ width: '100%', textAlign: 'left' }}
            onClick={() => handleSelectClient(client)}
          >
            <Card
              style={{ cursor: 'pointer', width: '100%' }}
              padding={2}
              paddingLeft={4}
              {...getCardVariant(selectedClient?.id === client.id)}
            >
              <CardContent>
                <CardTitle>{client.name}</CardTitle>
                {client.phone && <Typography textColor="neutral600">{client.phone}</Typography>}
              </CardContent>
            </Card>
          </button>
        </Grid.Item>
      ))}
    </Grid.Root>
  );
};

const getCardVariant = (isSelected: boolean) => {
  if (isSelected) {
    return {
      borderColor: 'primary700',
      background: 'neutral100',
    };
  }

  return null;
};
