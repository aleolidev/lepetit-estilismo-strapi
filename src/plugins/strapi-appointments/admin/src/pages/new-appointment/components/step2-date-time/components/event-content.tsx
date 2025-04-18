export const renderEventContent = (eventInfo: any) => {
  const serviceName = eventInfo.event.extendedProps?.service?.name || 'Service';
  const clientName = eventInfo.event.extendedProps?.client?.name;
  const isNew = eventInfo.event.extendedProps?.isNew;

  return (
    <>
      <div className="fc-event-time-row">
        <span className="fc-event-time">{eventInfo.timeText}</span>
        {clientName && <span className="fc-event-client-name">{clientName}</span>}
        {isNew && <span className="fc-event-badge">NEW</span>}
      </div>
      <div className="fc-event-title-container">
        <div className="fc-event-title">
          <strong>{serviceName}</strong>
        </div>
      </div>
    </>
  );
};
