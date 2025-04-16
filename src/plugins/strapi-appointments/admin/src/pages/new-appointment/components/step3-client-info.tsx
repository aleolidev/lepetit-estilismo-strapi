import { Box, Typography, Button, Flex, Tabs, TextInput, Textarea, Field } from '@strapi/design-system';
import { useState } from 'react';
import { format } from 'date-fns';
import { AppointmentData, Client, StepProps } from '../types';

interface Step3ClientInfoProps extends StepProps {
  onBack: () => void;
}

const Step3ClientInfo = ({ data, onUpdate, onBack }: Step3ClientInfoProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(data.client);
  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [notes, setNotes] = useState(data.notes);

  // Mock clients data - replace with actual data from your API
  const clients: Client[] = [
    { id: '1', name: 'John Doe', phone: '+1234567890', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', phone: '+0987654321', email: 'jane@example.com' },
  ];

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    onUpdate({ client });
  };

  const handleNewClientChange = (field: keyof typeof newClient, value: string) => {
    setNewClient((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    onUpdate({ notes: value });
  };

  const handleCreateNewClient = () => {
    const client: Client = {
      id: Date.now().toString(),
      name: newClient.name,
      phone: newClient.phone,
      email: newClient.email,
    };
    setSelectedClient(client);
    onUpdate({ client });
  };

  const isNewClientValid = newClient.name && newClient.phone;
  const isStepComplete = selectedClient !== null;

  return (
    <Box>
      {/* Client Information Section */}
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
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
                        <Typography variant="delta">
                          {client.name}
                        </Typography>
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNewClientChange('name', e.target.value)}
                      />
                    </Field.Root>
                    
                    <Field.Root required>
                      <Field.Label>Phone</Field.Label>
                      <TextInput
                        placeholder="Phone number"
                        value={newClient.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNewClientChange('phone', e.target.value)}
                      />
                    </Field.Root>
                    
                    <Field.Root>
                      <Field.Label>Email</Field.Label>
                      <TextInput
                        placeholder="Email address"
                        value={newClient.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNewClientChange('email', e.target.value)}
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

      {/* Additional Notes Section */}
      <Box paddingBottom={6}>
        <Box padding={4} background="neutral0" shadow="tableShadow" hasRadius>
          <Typography variant="delta" as="h2">
            Additional Notes
          </Typography>
          <Box paddingTop={4}>
            <Field.Root>
              <Field.Label>Notes</Field.Label>
              <Textarea
                placeholder="Add any additional notes..."
                value={notes}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleNotesChange(e.target.value)}
              />
            </Field.Root>
          </Box>
        </Box>
      </Box>

      {/* Appointment Summary Section */}
      <Box paddingBottom={6}>
        <Box padding={4} background="neutral0" shadow="tableShadow" hasRadius>
          <Typography variant="delta" as="h2">
            Appointment Summary
          </Typography>
          <Box paddingTop={4}>
            <Flex direction={{ xs: 'column', md: 'row' }} gap={4} paddingBottom={4}>
              <Box flex="1">
                <Box
                  padding={4}
                  background="neutral100"
                  hasRadius
                >
                  <Typography variant="delta">
                    Date & Time
                  </Typography>
                  <Typography variant="pi" textColor="neutral600">
                    {data.date ? format(data.date, 'MMMM d, yyyy') : 'Not selected'}
                  </Typography>
                  <Typography variant="pi" textColor="neutral600">
                    {data.time || 'Not selected'}
                  </Typography>
                </Box>
              </Box>
              
              <Box flex="1">
                <Box
                  padding={4}
                  background="neutral100"
                  hasRadius
                >
                  <Typography variant="delta">
                    Staff
                  </Typography>
                  <Typography variant="pi" textColor="neutral600">
                    {data.staff?.name || 'Not selected'}
                  </Typography>
                </Box>
              </Box>
            </Flex>
            
            <Box>
              <Box
                padding={4}
                background="neutral100"
                hasRadius
              >
                <Typography variant="delta">
                  Services
                </Typography>
                {data.services.length === 0 ? (
                  <Typography variant="pi" textColor="neutral600">
                    No services selected
                  </Typography>
                ) : (
                  data.services.map((service) => (
                    <Box key={service.id} paddingTop={2}>
                      <Typography variant="pi" textColor="neutral600">
                        {service.name} - ${service.price.toFixed(2)} ({service.duration} min)
                      </Typography>
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Button Section */}
      <Box display="flex" justifyContent="space-between">
        <Button variant="tertiary" onClick={onBack} size="L">
          Back
        </Button>
        <Button
          variant="success"
          onClick={() => console.log('Submit appointment', data)}
          disabled={!isStepComplete}
          size="L"
        >
          Book Appointment
        </Button>
      </Box>
    </Box>
  );
};

export { Step3ClientInfo }; 