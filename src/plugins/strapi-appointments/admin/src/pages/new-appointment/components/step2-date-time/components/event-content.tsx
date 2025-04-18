export const renderEventContent = (eventInfo: any) => {
  const serviceName = eventInfo.event.extendedProps?.service?.name || 'Service';
  const clientName = eventInfo.event.extendedProps?.client?.name;
  const isNew = eventInfo.event.extendedProps?.isNew;

  return (
    <>
      {isNew && <span className="fc-event-new-badge">NEW</span>}
      <div className="fc-event-title-container">
        <div className="fc-event-title">
          <strong>{serviceName}</strong>
        </div>
      </div>
      <div className="fc-event-time-row">
        <span className="fc-event-time">{eventInfo.timeText}</span>
      </div>
    </>
  );
};
