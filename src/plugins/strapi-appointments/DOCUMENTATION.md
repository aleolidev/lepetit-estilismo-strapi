# Strapi Appointments Plugin

## Overview
A generic appointments management plugin for Strapi that can be used for any service-based business. Initially implemented for a pet grooming business but designed to be adaptable for any appointment-based service.

## Requirements

### Core Features
1. **Appointment Management**
   - Create, view, and manage appointments
   - Track appointment status
   - Handle service duration and pricing
   - Support for service extras/add-ons

2. **User Roles**
   - Service Providers (groomers/admins)
   - Clients

3. **Schedule Management**
   - Base operating hours configuration
   - Custom schedule overrides
   - Single timezone support (Europe/Madrid)

4. **Pricing System**
   - Base price calculation
   - Adjustments based on service variants
   - Extra services pricing
   - Price recalculation based on actual duration

## Data Structure

### Content Types

1. **Appointment**
```typescript
{
  client: relation(User),
  provider: relation(User),
  service: relation(Service),
  serviceVariant: relation(ServiceVariant),
  date: datetime,
  scheduledDuration: integer,
  actualDuration: integer,
  status: enum('scheduled', 'in_progress', 'completed', 'cancelled'),
  extras: relation(ServiceExtra, multiple),
  basePrice: decimal,
  finalPrice: decimal,
  notes: text
}
```

2. **Service**
```typescript
{
  name: string,
  description: text,
  isActive: boolean,
  basePrice: decimal,
  variants: relation(ServiceVariant, multiple)
}
```

3. **ServiceVariant**
```typescript
{
  name: string,
  description: text,
  service: relation(Service),
  durationInMinutes: integer,
  priceMultiplier: decimal
}
```

4. **ServiceExtra**
```typescript
{
  name: string,
  description: text,
  price: decimal,
  isActive: boolean
}
```

5. **OperatingSchedule & Hours**
```typescript
{
  name: string,
  isDefault: boolean,
  provider: relation(User),
  hours: [{
    dayOfWeek: integer,
    startTime: time,
    endTime: time
  }]
}
```

## Implementation Plan

### Phase 1: Core Backend Setup
1. **Setup Basic Plugin Structure**
   - Initialize plugin
   - Configure TypeScript
   - Setup basic folder structure

2. **Implement Content Types**
   - Create all model definitions
   - Setup relations
   - Implement validation rules

3. **Core Services Implementation**
   ```plaintext
   server/services/
   ├── appointment.js
   ├── schedule.js
   └── price-calculator.js
   ```

### Phase 2: Basic API Implementation
1. **Controllers Development**
   ```plaintext
   server/controllers/
   ├── appointment.js
   ├── schedule.js
   └── settings.js
   ```

2. **API Routes**
   - GET /appointments
   - POST /appointments
   - PUT /appointments/:id
   - DELETE /appointments/:id
   - GET /services
   - GET /operating-hours

3. **Implement Basic Validation**
   - Date/time validation
   - Schedule availability checking
   - Basic pricing calculation

### Phase 3: Admin Panel Basic UI
1. **Setup Admin Panel Structure**
   ```plaintext
   admin/src/
   ├── components/
   │   ├── Calendar/
   │   └── AppointmentForm/
   ├── pages/
   │   ├── AppointmentsPage/
   │   └── ServicesPage/
   └── index.js
   ```

2. **Implement Basic Views**
   - Appointments list view
   - Service management
   - Basic calendar view

### Phase 4: Advanced Features
1. **Schedule Management**
   - Operating hours configuration
   - Schedule override system
   - Availability checking

2. **Price Calculation System**
   - Base price calculation
   - Variants pricing
   - Extras pricing
   - Duration-based adjustments

3. **Advanced Validation**
   - Double booking prevention
   - Business rules enforcement
   - Permission checking

### Phase 5: Advanced UI Features
1. **Calendar Enhancement**
   - Full calendar implementation
   - Drag-and-drop support
   - Filter and search

2. **Settings Management**
   - Plugin configuration UI
   - Schedule management UI
   - Service configuration UI

### Phase 6: Testing & Documentation
1. **Testing**
   - Unit tests for services
   - Integration tests for API
   - UI component tests

2. **Documentation**
   - API documentation
   - Setup guide
   - Configuration guide
   - User manual

## Testing Strategy
- Test each phase independently
- Create test cases for each feature
- Implement integration tests between phases
- User acceptance testing after each major phase

## Deployment Checklist
1. Verify all content types are properly registered
2. Check permissions setup
3. Validate API endpoints
4. Test admin panel functionality
5. Verify pricing calculations
6. Check schedule management
7. Test appointment creation flow
8. Verify role-based access

## Development Notes
- Each phase should be tested independently before moving to the next
- Follow Strapi's plugin development best practices
- Maintain generic naming conventions for broader applicability
- Document all configuration options and customization points
- Implement proper error handling and validation at each step

## TO-DO Tracking

### Phase 1: Core Backend Setup
- [ ] Plugin Initialization
  - [ ] Create plugin using Plugin SDK
  - [ ] Configure TypeScript
  - [ ] Setup folder structure

- [ ] Content Types Implementation
  - [ ] Appointment model
  - [ ] Service model
  - [ ] ServiceVariant model
  - [ ] ServiceExtra model
  - [ ] OperatingSchedule model
  - [ ] Setup all relations
  - [ ] Implement validation rules

- [ ] Core Services
  - [ ] Appointment service
    - [ ] CRUD operations
    - [ ] Status management
    - [ ] Validation logic
  - [ ] Schedule service
    - [ ] Availability checking
    - [ ] Operating hours management
  - [ ] Price calculator service
    - [ ] Base price calculation
    - [ ] Variants pricing
    - [ ] Duration adjustments

### Phase 2: Basic API Implementation
- [ ] Controllers
  - [ ] Appointment controller
  - [ ] Schedule controller
  - [ ] Settings controller

- [ ] API Routes
  - [ ] GET /appointments
  - [ ] POST /appointments
  - [ ] PUT /appointments/:id
  - [ ] DELETE /appointments/:id
  - [ ] GET /services
  - [ ] GET /operating-hours

- [ ] Basic Validation
  - [ ] Date/time validation
  - [ ] Schedule availability
  - [ ] Basic pricing calculation

### Phase 3: Admin Panel Basic UI
- [ ] Admin Panel Structure
  - [ ] Setup base components
  - [ ] Create Calendar component
  - [ ] Create AppointmentForm component

- [ ] Basic Views
  - [ ] Appointments list page
  - [ ] Services management page
  - [ ] Basic calendar view

### Phase 4: Advanced Features
- [ ] Schedule Management
  - [ ] Operating hours configuration
  - [ ] Schedule override system
  - [ ] Advanced availability checking

- [ ] Price System
  - [ ] Complete price calculator
  - [ ] Variants pricing system
  - [ ] Extras handling
  - [ ] Duration adjustments

- [ ] Validation System
  - [ ] Double booking prevention
  - [ ] Business rules
  - [ ] Permissions system

### Phase 5: Advanced UI Features
- [ ] Calendar
  - [ ] Full calendar implementation
  - [ ] Drag-and-drop functionality
  - [ ] Filtering system
  - [ ] Search functionality

- [ ] Settings UI
  - [ ] Plugin configuration interface
  - [ ] Schedule management interface
  - [ ] Service configuration interface

### Phase 6: Testing & Documentation
- [ ] Testing
  - [ ] Unit tests
  - [ ] Integration tests
  - [ ] UI component tests
  - [ ] E2E tests

- [ ] Documentation
  - [ ] API documentation
  - [ ] Setup guide
  - [ ] Configuration guide
  - [ ] User manual

### Additional Tasks
- [ ] Error handling implementation
- [ ] Logging system
- [ ] Performance optimization
- [ ] Security review
- [ ] Accessibility compliance
- [ ] Internationalization support



