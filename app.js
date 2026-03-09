// User avatar dropdown component (mock user)
function UserAvatarDropdown({ onSettings }) {
  const [open, setOpen] = React.useState(false);
  // Mock user data
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@demo.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  };
  // Close dropdown on outside click
  React.useEffect(() => {
    if (!open) return;
    function handle(e) {
      if (!e.target.closest('.user-avatar-dropdown')) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);
  return (
    <div className="relative user-avatar-dropdown">
      <button
        className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
        onClick={() => setOpen(o => !o)}
        aria-label="Open user menu"
      >
        <img src={user.avatar} alt="User avatar" className="w-10 h-10 rounded-full border-2 border-blue-500 shadow object-cover transition" />
      </button>
      {/* Dropdown */}
      <div className={`absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-4 px-5 z-40 transition-all duration-200 ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
        style={{ minWidth: '15rem' }}
        role="menu"
        aria-hidden={!open}
      >
        <div className="flex items-center gap-3 mb-4">
          <img src={user.avatar} alt="User avatar" className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover" />
          <div>
            <div className="font-bold text-lg text-gray-900">{user.name}</div>
            <div className="text-gray-500 text-sm">{user.email}</div>
            <div className="text-xs text-blue-600 font-semibold mt-1">Admin Account</div>
          </div>
        </div>
        <div className="border-t border-gray-200 my-2" />
        <button className="w-full text-left px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-blue-50 transition mb-1" onClick={() => { setOpen(false); if (onSettings) onSettings(); }}>Settings</button>
        <button className="w-full text-left px-3 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition" onClick={() => window.location.reload()}>Logout</button>
      </div>
    </div>
  );
}
// Tickets Section (Interactive)
function TicketsSection({ onLogTicket }) {
  const [tickets, setTickets] = React.useState([
    { id: 'TCK-1001', subject: 'Cannot login', description: 'I am unable to login to my account.', status: 'Open', priority: 'High', created: '2026-02-02 09:00' },
    { id: 'TCK-1002', subject: 'Billing issue', description: 'My invoice is incorrect.', status: 'In Progress', priority: 'Medium', created: '2026-02-02 09:10' },
  ]);
  const [form, setForm] = React.useState({ subject: '', description: '', priority: 'Low' });
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newTicket = {
      id: `TCK-${Date.now()}`,
      subject: form.subject,
      description: form.description,
      status: 'Open',
      priority: form.priority,
      created: new Date().toLocaleString(),
    };
    setTickets(list => [newTicket, ...list]);
    setForm({ subject: '', description: '', priority: 'Low' });
    if (onLogTicket) {
      onLogTicket({
        action: 'Created Ticket',
        by: 'Admin',
        timestamp: newTicket.created,
        category: 'Support',
        id: newTicket.id,
      });
    }
  }
  function handleStatusChange(idx, newStatus) {
    setTickets(list => {
      const updated = [...list];
      updated[idx].status = newStatus;
      if (onLogTicket) {
        onLogTicket({
          action: `Ticket status changed to ${newStatus}`,
          by: 'Admin',
          timestamp: new Date().toLocaleString(),
          category: 'Support',
          id: updated[idx].id,
        });
      }
      return updated;
    });
  }
  const statusOptions = ['Open', 'In Progress', 'Closed'];
  return (
    <section aria-labelledby="tickets-heading" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto">
      <h2 id="tickets-heading" className="text-2xl font-bold mb-6 text-black tracking-tight">Tickets</h2>
      <form onSubmit={handleSubmit} className="mb-8 space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="ticket-subject">Subject</label>
          <input id="ticket-subject" name="subject" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" value={form.subject} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="ticket-description">Description</label>
          <textarea id="ticket-description" name="description" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base min-h-[80px]" value={form.description} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="ticket-priority">Priority</label>
          <select id="ticket-priority" name="priority" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" value={form.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition w-full">Submit Ticket</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ticket ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Subject</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Priority</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t, idx) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-900">{t.id}</td>
                <td className="px-4 py-2 text-gray-900">{t.subject}</td>
                <td className="px-4 py-2">
                  <select
                    value={t.status}
                    onChange={e => handleStatusChange(idx, e.target.value)}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label={`Change status for ticket ${t.id}`}
                  >
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </td>
                <td className={`px-4 py-2 font-semibold ${t.priority === 'High' ? 'text-red-700' : t.priority === 'Medium' ? 'text-yellow-700' : 'text-green-700'}`}>{t.priority}</td>
                <td className="px-4 py-2 text-gray-900">{t.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
// Support Section (Informational)
function SupportSection() {
  // Live chat demo state

  // Guided chat state
  const [messages, setMessages] = React.useState([
    { sender: 'Support', text: 'Welcome! How can I assist you today?', timestamp: new Date().toLocaleTimeString() }
  ]);
  const chatEndRef = React.useRef(null);
  // Predefined quick-reply options
  const quickReplies = [
    { label: 'How do I submit a ticket?', value: 'ticket' },
    { label: 'Billing question', value: 'billing' },
    { label: 'Talk to support', value: 'talk' },
  ];
  // Predefined system responses
  const systemResponses = {
    ticket: 'To submit a ticket, go to the Tickets section and fill out the form. Navigating you there now...',
    billing: 'For billing questions, please check the Billing section or submit a ticket. Navigating you there now...',
    talk: 'A support agent will be with you soon. Please describe your issue in detail.',
    goToTickets: 'Navigating to the Tickets section...'
  };
  // Track which navigation action button to show ("tickets" or "billing" or null)
  const [navAction, setNavAction] = React.useState(null); // 'tickets' | 'billing' | null
  // Chat mode: 'options' (quick replies) or 'typing' (manual input)
  const [chatMode, setChatMode] = React.useState('options');
  // Show "Go to Tickets" button state (fix blank bug)
  const [showGoToTickets, setShowGoToTickets] = React.useState(false);

  // Handle quick reply click
  function handleQuickReply(value) {
    const userMsg = { sender: 'User', text: quickReplies.find(q => q.value === value).label, timestamp: new Date().toLocaleTimeString() };
    setMessages(msgs => [...msgs, userMsg]);
    setNavAction(null);
    if (value === 'ticket') {
      setTimeout(() => {
        setMessages(msgs => [
          ...msgs,
          { sender: 'Support', text: systemResponses[value], timestamp: new Date().toLocaleTimeString() }
        ]);
        setNavAction('tickets');
      }, 400);
    } else if (value === 'billing') {
      setTimeout(() => {
        setMessages(msgs => [
          ...msgs,
          { sender: 'Support', text: systemResponses[value], timestamp: new Date().toLocaleTimeString() }
        ]);
        setNavAction('billing');
      }, 400);
    } else if (value === 'talk') {
      setTimeout(() => {
        setMessages(msgs => [
          ...msgs,
          { sender: 'Support', text: systemResponses[value], timestamp: new Date().toLocaleTimeString() }
        ]);
        setChatMode('typing');
      }, 400);
    }
  }

  // Navigation action button click
  function handleNavActionClick(section) {
    setMessages(msgs => [
      ...msgs,
      { sender: 'User', text: section === 'tickets' ? 'Go to Tickets' : 'Go to Billing', timestamp: new Date().toLocaleTimeString() }
    ]);
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        if (typeof window.setActiveSection === 'function') {
          window.setActiveSection(section);
        } else if (window.__REACT_RENDERED) {
          const tabBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent && btn.textContent.match(new RegExp(section, 'i')));
          if (tabBtn) tabBtn.click();
        }
      }
    }, 400);
    setNavAction(null);
  }

  // Manual input mode for "Talk to Support"
  const [manualInput, setManualInput] = React.useState('');
  // Track if user can return to guided options
  const [showBackToOptions, setShowBackToOptions] = React.useState(false);

  function handleManualSend(e) {
    e.preventDefault();
    if (!manualInput.trim()) return;
    setMessages(msgs => [
      ...msgs,
      { sender: 'User', text: manualInput, timestamp: new Date().toLocaleTimeString() },
      { sender: 'Support', text: 'Thanks, a support agent will review this.', timestamp: new Date().toLocaleTimeString() }
    ]);
    setManualInput('');
    setShowBackToOptions(true);
  }

  function handleBackToOptions() {
    setChatMode('options');
    setShowBackToOptions(false);
  }

  // Handle "Go to Tickets" button
  function handleGoToTickets() {
    setMessages(msgs => [
      ...msgs,
      { sender: 'User', text: 'Go to Tickets', timestamp: new Date().toLocaleTimeString() }
    ]);
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { sender: 'Support', text: systemResponses.goToTickets, timestamp: new Date().toLocaleTimeString() }
      ]);
      // Simulate navigation
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          const ticketsTab = document.querySelector('button[aria-current], button[aria-label="Tickets"]');
          if (ticketsTab) ticketsTab.click();
        }, 600);
      }
    }, 400);
    setShowGoToTickets(false);
  }

  return (
    <section aria-labelledby="support-heading" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-3xl mx-auto">
      <h2 id="support-heading" className="text-2xl font-bold mb-6 text-black tracking-tight">Support</h2>
      {/* Live Chat Demo - moved above FAQ */}
      <div className="bg-white rounded-xl border border-gray-100 shadow p-4 max-w-lg mx-auto mb-8">
        <h3 className="text-lg font-semibold text-blue-700 mb-3">Live Chat (Demo)</h3>
        <div className="overflow-y-auto h-64 flex flex-col gap-2 px-2 pb-2" style={{scrollBehavior:'smooth'}}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl shadow text-base ${msg.sender === 'User' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs">{msg.sender}</span>
                  <span className="text-xs text-gray-400">{msg.timestamp}</span>
                </div>
                <div>{msg.text}</div>
                {/* Show Go to Tickets button if needed */}
                {msg.sender === 'Support' && showGoToTickets && idx === messages.length - 1 && (
                  <button
                    className="mt-3 bg-blue-600 text-white px-4 py-1.5 rounded-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={handleGoToTickets}
                  >Go to Tickets</button>
                )}
              </div>
            </div>
          ))}
          {/* Render quick-reply options as user bubbles inside chat history */}
          {chatMode === 'options' && quickReplies.length > 0 && (
            <div className="flex flex-col gap-2 items-end w-full mt-1">
              {quickReplies.map(q => (
                <button
                  key={q.value}
                  className="max-w-[80%] px-5 py-2 rounded-2xl bg-blue-600 text-white font-medium text-base shadow-sm border border-blue-500 text-right transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer mb-1 hover:bg-blue-700 active:bg-blue-800"
                  style={{
                    borderRadius: '1.5rem 1.5rem 0.5rem 1.5rem',
                    alignSelf: 'flex-end',
                    marginRight: 0,
                    marginLeft: 'auto',
                    boxShadow: '0 2px 8px 0 rgba(37,99,235,0.07)',
                  }}
                  onClick={() => handleQuickReply(q.value)}
                  type="button"
                  tabIndex={0}
                >{q.label}</button>
              ))}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        {/* Chat options or manual input - fix blank state bug */}
        {chatMode === 'options' && navAction && (
          <div className="mt-3 flex justify-center">
            <button
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
              onClick={() => handleNavActionClick(navAction)}
              type="button"
            >{navAction === 'tickets' ? 'Go to Tickets' : 'Go to Billing'}</button>
          </div>
        )}
        {chatMode === 'typing' && (
          <>
            <form className="mt-3 flex gap-2" onSubmit={handleManualSend} autoComplete="off">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                value={manualInput}
                onChange={e => setManualInput(e.target.value)}
                placeholder="Type your message..."
                aria-label="Type your message"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              >Send</button>
            </form>
            {showBackToOptions && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow border border-gray-300 hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-blue-200"
                  onClick={handleBackToOptions}
                >Back to chat options</button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="grid gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">FAQs</h3>
          <ul className="list-disc pl-5 text-black text-base">
            <li>How do I reset my password?</li>
            <li>How do I contact support?</li>
            <li>Where can I find billing information?</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Contact Info</h3>
          <ul className="text-black text-base">
            <li>Email: support@vanguard.com</li>
            <li>Phone: +1 (800) 555-1234</li>
            <li>Live Chat: Available 9am-5pm EST</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow">
          <h3 className="text-lg font-semibold text-yellow-700 mb-2">Support Guidelines</h3>
          <ul className="list-disc pl-5 text-black text-base">
            <li>Provide detailed information when submitting tickets.</li>
            <li>Check FAQs before contacting support.</li>
            <li>Allow up to 24 hours for a response.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
// Feature Flags Section Component
function FeatureFlagsSection({ onLogFeature }) {
  const [flags, setFlags] = React.useState([
    { name: 'Beta Access', description: 'Enable beta features for users.', enabled: true },
    { name: 'Dark Mode', description: 'Allow users to switch to dark mode.', enabled: false },
    { name: 'Advanced Analytics', description: 'Show advanced analytics dashboard.', enabled: true },
    { name: 'Chat Support', description: 'Enable live chat support.', enabled: false },
  ]);
  function handleToggle(idx) {
    setFlags(list => {
      const updated = [...list];
      updated[idx].enabled = !updated[idx].enabled;
      if (onLogFeature) {
        onLogFeature({
          action: updated[idx].enabled ? 'Enabled Feature' : 'Disabled Feature',
          by: 'Admin',
          timestamp: new Date().toLocaleString(),
          category: 'Feature Flags',
          name: updated[idx].name,
        });
      }
      return updated;
    });
  }
  return (
    <section aria-labelledby="feature-flags-heading" className="bg-white dark:bg-gray-900 dark:border-gray-800 dark:shadow-2xl rounded-2xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto">
      <h2 id="feature-flags-heading" className="text-2xl font-bold mb-6 text-black tracking-tight">Feature Flags</h2>
      <ul className="space-y-6">
        {flags.map((flag, idx) => (
          <li key={flag.name} className="bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:shadow-xl rounded-xl p-6 shadow flex flex-col md:flex-row md:items-center md:justify-between border border-gray-200">
            <div className="flex-1">
              <div className="text-xl font-bold text-gray-900 mb-1">{flag.name}</div>
              <div className="text-black mb-2">{flag.description}</div>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0 items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-gray-700 text-sm">Enable</span>
                <input
                  type="checkbox"
                  checked={flag.enabled}
                  onChange={() => handleToggle(idx)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </label>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// System Health Section Component
function SystemHealthSection() {
  const uptime = 99.98;
  const services = [
    { name: 'API', status: 'Online' },
    { name: 'Database', status: 'Online' },
    { name: 'Email', status: 'Degraded' },
    { name: 'Payments', status: 'Offline' },
  ];
  const statusColor = s => s === 'Online' ? 'bg-green-100 text-green-700' : s === 'Degraded' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
  return (
    <section aria-labelledby="system-health-heading" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto">
      <h2 id="system-health-heading" className="text-2xl font-bold mb-6 text-black tracking-tight">System Health</h2>
      <div className="mb-8">
        <div className="text-lg font-semibold text-gray-700 mb-2">Uptime</div>
        <span className="px-4 py-2 rounded-full font-semibold bg-green-100 text-green-700">{uptime}%</span>
      </div>
      <div>
        <div className="text-lg font-semibold text-gray-700 mb-2">Services</div>
        <ul className="space-y-3">
          {services.map(s => (
            <li key={s.name} className="flex items-center gap-4">
              <span className="text-gray-900 font-medium w-32">{s.name}</span>
              <span className={`px-3 py-1 rounded-full font-semibold text-sm ${statusColor(s.status)}`}>{s.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Support / Tickets Section Component
function SupportTicketsSection({ onLogTicket }) {
  const [tickets, setTickets] = React.useState([
    { id: 'TCK-1001', user: 'Alice', summary: 'Cannot login', status: 'Open', priority: 'High' },
    { id: 'TCK-1002', user: 'Bob', summary: 'Billing issue', status: 'In Progress', priority: 'Medium' },
    { id: 'TCK-1003', user: 'Charlie', summary: 'Feature request', status: 'Closed', priority: 'Low' },
  ]);
  const statusOptions = ['Open', 'In Progress', 'Closed'];
  function handleStatusChange(idx, newStatus) {
    setTickets(list => {
      const updated = [...list];
      updated[idx].status = newStatus;
      if (onLogTicket) {
        onLogTicket({
          action: `Ticket status changed to ${newStatus}`,
          by: 'Admin',
          timestamp: new Date().toLocaleString(),
          category: 'Support',
          id: updated[idx].id,
        });
      }
      return updated;
    });
  }
  return (
    <section aria-labelledby="support-tickets-heading" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto">
      <h2 id="support-tickets-heading" className="text-2xl font-bold mb-6 text-black tracking-tight">Support / Tickets</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ticket ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Issue</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Priority</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t, idx) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-900">{t.id}</td>
                <td className="px-4 py-2 text-gray-900">{t.user}</td>
                <td className="px-4 py-2 text-gray-900">{t.summary}</td>
                <td className="px-4 py-2">
                  <select
                    value={t.status}
                    onChange={e => handleStatusChange(idx, e.target.value)}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label={`Change status for ticket ${t.id}`}
                  >
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </td>
                <td className={`px-4 py-2 font-semibold ${t.priority === 'High' ? 'text-red-700' : t.priority === 'Medium' ? 'text-yellow-700' : 'text-green-700'}`}>{t.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
// Billing Section Component
function BillingSection() {
  // Define APIs/features per plan
  const apiFeatures = [
    { key: 'basic', label: 'Basic API', desc: 'Access to core endpoints' },
    { key: 'analytics', label: 'Analytics API', desc: 'Advanced analytics endpoints' },
    { key: 'priority', label: 'Priority Support', desc: 'Faster response times' },
    { key: 'dedicated', label: 'Dedicated Support', desc: 'Personalized support rep' },
    { key: 'unlimited', label: 'Unlimited API Calls', desc: 'No API call limits' },
  ];
  // Plans with unlocked features
  const plans = [
    {
      name: 'Starter',
      price: '$19/mo',
      apis: ['basic'],
      features: [],
      active: false,
      highlight: false,
    },
    {
      name: 'Growth',
      price: '$29/mo',
      apis: ['basic', 'analytics', 'priority'], // Tick Priority Support for Growth
      features: [],
      active: false,
      highlight: true, // Most popular
    },
    {
      name: 'Pro',
      price: '$49/mo',
      apis: ['basic', 'analytics', 'priority', 'dedicated', 'unlimited'], // Tick all for Pro
      features: [],
      active: true,
      highlight: false,
    },
  ];
  const invoices = [
    { id: 'INV-1001', date: '2026-01-01', amount: '$49.00', status: 'Paid' },
    { id: 'INV-1002', date: '2026-02-01', amount: '$49.00', status: 'Due' },
  ];
  const paymentStatus = 'Active';
  return (
    <section aria-labelledby="billing-heading" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto">
      <h2 id="billing-heading" className="text-2xl font-bold mb-6 text-black tracking-tight">Billing</h2>
      <div className="mb-8">
        <div className="text-lg font-semibold text-gray-700 mb-2">Current Plan</div>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <li
              key={plan.name}
              className={`relative rounded-xl p-6 shadow-sm border flex flex-col items-center bg-white ${plan.highlight ? 'border-blue-400 ring-2 ring-blue-100 z-10 scale-105' : 'border-gray-200'} transition-all duration-200`}
              style={{ minHeight: '320px' }}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-blue-500 text-white text-xs font-semibold shadow">Most Popular</span>
              )}
              <div className="text-xl font-bold mb-2">{plan.name}</div>
              <div className="text-blue-700 font-semibold mb-2">{plan.price}</div>
              <div className="flex flex-col gap-2 w-full mt-2">
                {apiFeatures.map(api => (
                  <div
                    key={api.key}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition ${plan.apis.includes(api.key) ? 'bg-blue-50 text-blue-800 font-semibold' : 'bg-gray-100 text-gray-400 line-through'}`}
                    title={api.desc}
                    style={{ cursor: plan.apis.includes(api.key) ? 'pointer' : 'not-allowed' }}
                  >
                    <span className="inline-block w-5 text-center">
                      {plan.apis.includes(api.key) ? (
                        <svg className="w-4 h-4 text-green-500 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-4 h-4 text-gray-300 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /></svg>
                      )}
                    </span>
                    <span>{api.label}</span>
                  </div>
                ))}
              </div>
              {/* Removed extra features/subtext as requested */}
              {plan.active && (
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mt-2 border border-blue-300">Active</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <div className="text-lg font-semibold text-gray-700 mb-2">Invoices</div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Invoice ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-900">{inv.id}</td>
                  <td className="px-4 py-2 text-gray-900">{inv.date}</td>
                  <td className="px-4 py-2 text-gray-900">{inv.amount}</td>
                  <td className={`px-4 py-2 font-semibold ${inv.status === 'Paid' ? 'text-green-700' : 'text-red-700'}`}>{inv.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="text-lg font-semibold text-gray-700 mb-2">Payment Status</div>
        <span className={`px-4 py-2 rounded-full font-semibold ${paymentStatus === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{paymentStatus}</span>
      </div>
    </section>
  );
}
// Integrations Section Component
function IntegrationsSection({ onLogIntegration }) {
  const [integrations, setIntegrations] = React.useState([
    {
      name: 'Stripe',
      description: 'Payment processing and subscriptions.',
      connected: false,
      enabled: true,
    },
    {
      name: 'GitHub',
      description: 'Code hosting and version control.',
      connected: true,
      enabled: true,
    },
    {
      name: 'Slack',
      description: 'Team messaging and notifications.',
      connected: false,
      enabled: false,
    },
    {
      name: 'Google Analytics',
      description: 'Website analytics and traffic insights.',
      connected: true,
      enabled: true,
    },
  ]);

  function handleToggleEnable(idx) {
    setIntegrations(list => {
      const updated = [...list];
      updated[idx].enabled = !updated[idx].enabled;
      if (onLogIntegration) {
        onLogIntegration({
          action: updated[idx].enabled ? 'Enabled Integration' : 'Disabled Integration',
          by: 'Admin',
          timestamp: new Date().toLocaleString(),
          category: 'Integrations',
          name: updated[idx].name,
        });
      }
      return updated;
    });
  }

  function handleConnect(idx) {
    setIntegrations(list => {
      const updated = [...list];
      updated[idx].connected = true;
      if (onLogIntegration) {
        onLogIntegration({
          action: 'Connected Integration',
          by: 'Admin',
          timestamp: new Date().toLocaleString(),
          category: 'Integrations',
          name: updated[idx].name,
        });
      }
      return updated;
    });
  }

  function handleDisconnect(idx) {
    setIntegrations(list => {
      const updated = [...list];
      updated[idx].connected = false;
      if (onLogIntegration) {
        onLogIntegration({
          action: 'Disconnected Integration',
          by: 'Admin',
          timestamp: new Date().toLocaleString(),
          category: 'Integrations',
          name: updated[idx].name,
        });
      }
      return updated;
    });
  }

  return (
    <section aria-labelledby="integrations-heading" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto">
      <h2 id="integrations-heading" className="text-2xl font-bold mb-6 text-black tracking-tight">Integrations</h2>
      <ul className="space-y-6">
        {integrations.map((integration, idx) => (
          <li key={integration.name} className="bg-gray-50 rounded-xl p-6 shadow flex flex-col md:flex-row md:items-center md:justify-between border border-gray-200">
            <div className="flex-1">
              <div className="text-xl font-bold text-gray-900 mb-1">{integration.name}</div>
              <div className="text-black mb-2">{integration.description}</div>
              <div className="flex gap-4 items-center mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${integration.connected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{integration.connected ? 'Connected' : 'Disconnected'}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              {integration.connected ? (
                <button
                  className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition"
                  onClick={() => handleDisconnect(idx)}
                >
                  Disconnect
                </button>
              ) : (
                <button
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
                  onClick={() => handleConnect(idx)}
                >
                  Connect
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
// Activity Logs Section Component
function ActivityLogsSection({ logs }) {
  const [filter, setFilter] = React.useState('all');
  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.category === filter);
  return (
    <section aria-labelledby="activity-logs-heading" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-5xl mx-auto">
      <h2 id="activity-logs-heading" className="text-2xl font-bold mb-6 text-gray-800 tracking-tight">Activity Logs</h2>
      <div className="mb-6 flex gap-3 flex-wrap" role="radiogroup" aria-label="Log Category Filter">
        {[
          { key: 'all', label: 'All' },
          { key: 'Entries', label: 'Entries' },
          { key: 'Users', label: 'Users' },
          { key: 'Settings', label: 'Settings' },
        ].map(opt => (
          <button
            key={opt.key}
            className={
              'px-5 py-2 rounded-lg font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ' +
              (filter === opt.key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
            }
            aria-checked={filter === opt.key}
            role="radio"
            onClick={() => setFilter(opt.key)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th>
              <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Performed By</th>
              <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Timestamp</th>
              <th scope="col" className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-400 py-6">No logs found.</td>
              </tr>
            ) : filteredLogs.slice().reverse().map((log, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-900">{log.action}</td>
                <td className="px-4 py-2 text-gray-900">{log.by}</td>
                <td className="px-4 py-2 text-gray-900">{log.timestamp}</td>
                <td className="px-4 py-2 text-gray-900">{log.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
// RevenueDashboard Component
function RevenueDashboard() {

  const [filter, setFilter] = React.useState('thisMonth');
  // Mock monthly data for charts and metrics
  const monthlyData = [
    { month: '2026-01', revenue: 12000, expenses: 8500, profit: 3500 },
    { month: '2025-12', revenue: 9000, expenses: 6500, profit: 2500 },
    { month: '2025-11', revenue: 10500, expenses: 7000, profit: 3500 },
    { month: '2025-10', revenue: 9800, expenses: 6200, profit: 3600 },
    { month: '2025-09', revenue: 11000, expenses: 8000, profit: 3000 },
    { month: '2025-08', revenue: 9500, expenses: 6700, profit: 2800 },
    { month: '2025-07', revenue: 10200, expenses: 7200, profit: 3000 },
  ];
  // Pie chart categories
  const pieCategories = [
    { label: 'Subscriptions', value: 6000 },
    { label: 'Services', value: 4000 },
    { label: 'One-Time Sales', value: 2000 },
  ];

  // Filtered data by range
  let filteredMonths = monthlyData;
  if (filter === 'thisMonth') filteredMonths = [monthlyData[0]];
  else if (filter === 'last6') filteredMonths = monthlyData.slice(0, 6);
  else if (filter === 'thisYear') filteredMonths = monthlyData;

  // Summary metrics
  const totalRevenue = filteredMonths.reduce((sum, m) => sum + m.revenue, 0);
  const totalExpenses = filteredMonths.reduce((sum, m) => sum + m.expenses, 0);
  const netProfit = filteredMonths.reduce((sum, m) => sum + m.profit, 0);
  const avgMonthlyRevenue = Math.round(totalRevenue / filteredMonths.length);

  // Chart refs
  const pieRef = React.useRef(null);
  const lineRef = React.useRef(null);
  const barRef = React.useRef(null);

  // Pie chart (revenue by category)
  React.useEffect(() => {
    if (!pieRef.current) return;
    let chart = pieRef.current._chartInstance;
    if (!chart) {
      const ctx = pieRef.current.getContext('2d');
      chart = new window.Chart(ctx, {
        type: 'pie',
        data: {
          labels: pieCategories.map(c => c.label),
          datasets: [{
            data: pieCategories.map(c => c.value),
            backgroundColor: ['#2563eb', '#f59e42', '#10b981'],
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom', labels: { color: '#374151', font: { size: 16 } } },
            title: { display: true, text: 'Revenue Distribution by Category', color: '#1e293b', font: { size: 20 } },
          },
          maintainAspectRatio: false,
          animation: { animateScale: true },
          accessibility: { enabled: true },
        },
      });
      pieRef.current._chartInstance = chart;
    } else {
      chart.data.labels = pieCategories.map(c => c.label);
      chart.data.datasets[0].data = pieCategories.map(c => c.value);
      chart.update();
    }
  }, [filter]);

  // Line chart (monthly revenue trend)
  React.useEffect(() => {
    if (!lineRef.current) return;
    let chart = lineRef.current._chartInstance;
    if (!chart) {
      const ctx = lineRef.current.getContext('2d');
      chart = new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: filteredMonths.map(m => m.month),
          datasets: [{
            label: 'Revenue',
            data: filteredMonths.map(m => m.revenue),
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,0.1)',
            tension: 0.3,
            fill: true,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Monthly Revenue Trend', color: '#1e293b', font: { size: 18 } },
          },
          scales: {
            x: { ticks: { color: '#374151' } },
            y: { ticks: { color: '#374151' } },
          },
          maintainAspectRatio: false,
          accessibility: { enabled: true },
        },
      });
      lineRef.current._chartInstance = chart;
    } else {
      chart.data.labels = filteredMonths.map(m => m.month);
      chart.data.datasets[0].data = filteredMonths.map(m => m.revenue);
      chart.update();
    }
  }, [filter, filteredMonths.length]);

  // Bar chart (profits vs expenses)
  React.useEffect(() => {
    if (!barRef.current) return;
    let chart = barRef.current._chartInstance;
    if (!chart) {
      const ctx = barRef.current.getContext('2d');
      chart = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: filteredMonths.map(m => m.month),
          datasets: [
            {
              label: 'Profit',
              data: filteredMonths.map(m => m.profit),
              backgroundColor: '#10b981',
            },
            {
              label: 'Expenses',
              data: filteredMonths.map(m => m.expenses),
              backgroundColor: '#f59e42',
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom', labels: { color: '#374151', font: { size: 14 } } },
            title: { display: true, text: 'Profits vs Expenses', color: '#1e293b', font: { size: 18 } },
          },
          scales: {
            x: { ticks: { color: '#374151' } },
            y: { ticks: { color: '#374151' } },
          },
          maintainAspectRatio: false,
          accessibility: { enabled: true },
        },
      });
      barRef.current._chartInstance = chart;
    } else {
      chart.data.labels = filteredMonths.map(m => m.month);
      chart.data.datasets[0].data = filteredMonths.map(m => m.profit);
      chart.data.datasets[1].data = filteredMonths.map(m => m.expenses);
      chart.update();
    }
  }, [filter, filteredMonths.length]);

  // Mock purchase history data
  const purchaseHistory = [
    { id: 'INV-1001', customer: 'Acme Corp', date: '2026-01-28', amount: 3200, method: 'Credit Card', status: 'Paid' },
    { id: 'INV-1002', customer: 'Beta LLC', date: '2026-01-25', amount: 1500, method: 'PayPal', status: 'Paid' },
    { id: 'INV-1003', customer: 'Gamma Inc', date: '2026-01-20', amount: 800, method: 'Bank Transfer', status: 'Pending' },
    { id: 'INV-1004', customer: 'Delta Ltd', date: '2026-01-15', amount: 2200, method: 'Credit Card', status: 'Paid' },
    { id: 'INV-1005', customer: 'Epsilon GmbH', date: '2026-01-10', amount: 950, method: 'Credit Card', status: 'Refunded' },
  ];
  return (
    <section aria-labelledby="revenue-heading" className="bg-white rounded-2xl shadow-lg border border-gray-100 mx-auto max-w-full overflow-x-hidden p-3 sm:p-4 md:p-6">
      <h2 id="revenue-heading" className="text-2xl font-bold mb-6 text-gray-800 tracking-tight">Revenue Analytics</h2>
      {/* Time Filter */}
      <div className="mb-6 flex gap-2 flex-wrap" role="radiogroup" aria-label="Time Filter">
        {[
          { key: 'thisMonth', label: 'This Month' },
          { key: 'last6', label: 'Last 6 Months' },
          { key: 'thisYear', label: 'This Year' },
        ].map(opt => (
          <button
            key={opt.key}
            className={
              'px-5 py-2 rounded-lg font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ' +
              (filter === opt.key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
            }
            aria-checked={filter === opt.key}
            role="radio"
            onClick={() => setFilter(opt.key)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-10">
        <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center shadow" aria-label="Total Revenue">
          <div className="text-lg font-semibold text-blue-700 mb-2">Total Revenue</div>
          <div className="text-3xl font-bold text-blue-900">${totalRevenue.toLocaleString()}</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-6 flex flex-col items-center shadow" aria-label="Total Expenses">
          <div className="text-lg font-semibold text-orange-700 mb-2">Total Expenses</div>
          <div className="text-3xl font-bold text-orange-900">${totalExpenses.toLocaleString()}</div>
        </div>
        <div className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow" aria-label="Net Profit">
          <div className="text-lg font-semibold text-green-700 mb-2">Net Profit</div>
          <div className="text-3xl font-bold text-green-900">${netProfit.toLocaleString()}</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 flex flex-col items-center shadow min-w-0" aria-label="Avg Monthly Revenue" style={{width:'100%'}}>
          <div className="text-lg font-semibold text-purple-700 mb-2">Avg Revenue</div>
          <div className="text-3xl font-bold text-purple-900">${avgMonthlyRevenue.toLocaleString()}</div>
        </div>
      </div>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8">
        {/* Pie Chart */}
        <div className="flex flex-col items-center w-full">
          <div className="w-full h-56 sm:h-64 md:h-80 max-w-full flex items-center justify-center overflow-x-auto">
            <canvas
              ref={pieRef}
              aria-label="Revenue Distribution Pie Chart"
              role="img"
              className="w-full h-full"
            />
          </div>
        </div>
        {/* Line Chart */}
        <div className="flex flex-col items-center w-full">
          <div className="w-full h-56 sm:h-64 md:h-80 max-w-full flex items-center justify-center overflow-x-auto">
            <canvas
              ref={lineRef}
              aria-label="Monthly Revenue Trend Line Chart"
              role="img"
              className="w-full h-full"
            />
          </div>
        </div>
        {/* Bar Chart */}
        <div className="flex flex-col items-center w-full">
          <div className="w-full h-56 sm:h-64 md:h-80 max-w-full flex items-center justify-center overflow-x-auto">
            <canvas
              ref={barRef}
              aria-label="Profits vs Expenses Bar Chart"
              role="img"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      {/* Purchase History Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Purchase History</h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white max-w-full">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Invoice #</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Customer</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Date</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Method</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-2 text-gray-900 font-medium">{purchase.id}</td>
                  <td className="px-4 py-2 text-gray-900">{purchase.customer}</td>
                  <td className="px-4 py-2 text-gray-900">{purchase.date}</td>
                  <td className="px-4 py-2 text-gray-900">${purchase.amount.toLocaleString()}</td>
                  <td className="px-4 py-2 text-gray-900">{purchase.method}</td>
                  <td className={
                    'px-4 py-2 font-semibold ' +
                    (purchase.status === 'Paid' ? 'text-green-700' : purchase.status === 'Pending' ? 'text-yellow-700' : 'text-red-700')
                  }>{purchase.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
const { useState, useEffect } = React;

// Start with no seeded data
const initialProjects = [];

// Project Form Component
function VanguardAdminProjectForm({ onAdd, editingProject, onCancelEdit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(editingProject ? editingProject.name : "");
    setDescription(editingProject ? editingProject.description : "");
  }, [editingProject]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    onAdd({ name: name.trim(), description: description.trim(), id: editingProject ? editingProject.id : Date.now() });
    setName("");
    setDescription("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg mb-10 max-w-xl mx-auto border border-gray-100"
      aria-label={editingProject ? 'Edit Entry' : 'Create Entry'}
    >
      <h2
        className={
          `text-2xl font-bold mb-6 tracking-tight flex items-center gap-2 ` +
          (editingProject ? 'text-yellow-700' : 'text-blue-700')
        }
      >
        {editingProject ? (
          <>
            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5h2m-1 0v14m-7-7h14" /></svg>
            Edit Entry
          </>
        ) : (
          <>
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Create Entry
          </>
        )}
      </h2>
      <div className="mb-5">
        <label className="block text-gray-700 font-medium mb-2">Name</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-lg transition"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Enter name"
        />
      </div>
      <div className="mb-7">
        <label className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base transition min-h-[60px]"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          placeholder="Enter description"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className={
            `px-5 py-2 rounded-lg font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ` +
            (editingProject
              ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500 focus:ring-yellow-300'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400')
          }
        >
          {editingProject ? "Update" : "Create"}
        </button>
        {editingProject && (
          <button
            type="button"
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition vanguard-admin-btn-custom focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function VanguardAdminDashboard({ onLogOut }) {
            // Handler to log feature flag changes
            function logFeatureFlagChange(log) {
              setLogs(prev => [
                {
                  action: log.action,
                  by: log.by,
                  timestamp: log.timestamp,
                  category: log.category,
                  name: log.name,
                },
                ...prev,
              ]);
            }
            // Handler to log ticket changes
            function logTicketChange(log) {
              setLogs(prev => [
                {
                  action: log.action,
                  by: log.by,
                  timestamp: log.timestamp,
                  category: log.category,
                  id: log.id,
                },
                ...prev,
              ]);
            }
          // Handler to log integration changes
          function logIntegrationChange(log) {
            setLogs(prev => [
              {
                action: log.action,
                by: log.by,
                timestamp: log.timestamp,
                category: log.category,
                name: log.name,
              },
              ...prev,
            ]);
          }
        // Activity logs state
        const [logs, setLogs] = useState([
          { action: 'Login', by: 'Admin', timestamp: '2026-02-02 09:00', category: 'Users' },
          { action: 'Create Entry', by: 'Admin', timestamp: '2026-02-02 09:05', category: 'Entries' },
          { action: 'Edit Entry', by: 'Admin', timestamp: '2026-02-02 09:10', category: 'Entries' },
          { action: 'Settings Updated', by: 'Admin', timestamp: '2026-02-02 09:15', category: 'Settings' },
          { action: 'Logout', by: 'Admin', timestamp: '2026-02-02 09:20', category: 'Users' },
        ]);
      // --- Users State and Handlers ---
      // --- Enhanced Users Section ---
      const initialUsers = [
        { id: 1, name: 'Alice Johnson', email: 'alice@demo.com', role: 'Admin', status: 'Active', created: '2025-12-01', profilePic: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: 2, name: 'Bob Smith', email: 'bob@demo.com', role: 'User', status: 'Suspended', created: '2025-12-10', profilePic: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: 3, name: 'Charlie Lee', email: 'charlie@demo.com', role: 'Moderator', status: 'Inactive', created: '2026-01-05', profilePic: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 4, name: 'Dana White', email: 'dana@demo.com', role: 'User', status: 'Active', created: '2026-01-15', profilePic: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { id: 5, name: 'Eve Black', email: 'eve@demo.com', role: 'Admin', status: 'Active', created: '2026-01-20', profilePic: 'https://randomuser.me/api/portraits/women/5.jpg' },
        { id: 6, name: 'Frank Green', email: 'frank@demo.com', role: 'User', status: 'Active', created: '2026-01-25', profilePic: 'https://randomuser.me/api/portraits/men/6.jpg' },
      ];
      const [users, setUsers] = useState(initialUsers);
      const [editingUser, setEditingUser] = useState(null);
      const [userForm, setUserForm] = useState({ name: '', email: '', role: 'User', status: 'Active' });
      const [userFormError, setUserFormError] = useState('');
      const [userSearch, setUserSearch] = useState('');
      const [roleFilter, setRoleFilter] = useState('');
      const [statusFilter, setStatusFilter] = useState('');
      const [sortField, setSortField] = useState('name');
      const [sortDir, setSortDir] = useState('asc');
      const [page, setPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(5);

      // Filtering, sorting, searching
      let filtered = users.filter(u =>
        (!roleFilter || u.role === roleFilter) &&
        (!statusFilter || u.status === statusFilter) &&
        (u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()))
      );
      filtered = filtered.sort((a, b) => {
        let valA = a[sortField], valB = b[sortField];
        if (sortField === 'created') {
          valA = new Date(valA);
          valB = new Date(valB);
        }
        if (valA < valB) return sortDir === 'asc' ? -1 : 1;
        if (valA > valB) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
      const totalPages = Math.ceil(filtered.length / itemsPerPage);
      const pagedUsers = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

      // Actions
      function handleEditUser(user) {
        setEditingUser(user);
        setUserForm({ name: user.name, email: user.email, role: user.role, status: user.status });
        setUserFormError('');
      }
      function handleUserFormChange(e) {
        const { name, value } = e.target;
        setUserForm(f => ({ ...f, [name]: value }));
        setUserFormError('');
      }
      function handleUserFormSubmit(e) {
        e.preventDefault();
        if (!userForm.name.trim() || !userForm.email.trim()) {
          setUserFormError('Name and email are required.');
          return;
        }
        const updated = users.map(u => u.id === editingUser.id ? { ...userForm, id: editingUser.id, created: u.created } : u);
        setUsers(updated);
        setEditingUser(null);
        setUserForm({ name: '', email: '', role: 'User', status: 'Active' });
        setUserFormError('');
        setLogs(prev => [{ action: 'Edit User', by: 'Admin', timestamp: new Date().toLocaleString(), category: 'Users', id: editingUser.id }, ...prev]);
      }
      function handleCancelUserEdit() {
        setEditingUser(null);
        setUserForm({ name: '', email: '', role: 'User', status: 'Active' });
        setUserFormError('');
      }
      function handleDeleteUser(id) {
        setUsers(users => users.filter(u => u.id !== id));
        setLogs(prev => [{ action: 'Delete User', by: 'Admin', timestamp: new Date().toLocaleString(), category: 'Users', id }, ...prev]);
        if (editingUser && editingUser.id === id) handleCancelUserEdit();
      }
      function handleToggleStatus(id) {
        setUsers(users => users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
        setLogs(prev => [{ action: 'Toggle User Status', by: 'Admin', timestamp: new Date().toLocaleString(), category: 'Users', id }, ...prev]);
      }
      function handleSort(field) {
        if (sortField === field) setSortDir(dir => dir === 'asc' ? 'desc' : 'asc');
        else { setSortField(field); setSortDir('asc'); }
      }
      function handlePageChange(newPage) { setPage(newPage); }
      function handleItemsPerPage(e) { setItemsPerPage(Number(e.target.value)); setPage(1); }

      // --- Users Table UI ---
      // Inline edit modal
      const editModal = editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-200" onSubmit={handleUserFormSubmit}>
            <h3 className="text-xl font-bold mb-6 text-gray-800 text-center">Edit User</h3>
            {userFormError && <div className="mb-4 text-red-600 text-sm text-center font-semibold">{userFormError}</div>}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="edit-name">Name</label>
              <input id="edit-name" name="name" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" value={userForm.name} onChange={handleUserFormChange} required />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="edit-email">Email</label>
              <input id="edit-email" name="email" type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" value={userForm.email} onChange={handleUserFormChange} required />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="edit-role">Role</label>
              <select id="edit-role" name="role" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" value={userForm.role} onChange={handleUserFormChange}>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition w-full">Save</button>
              <button type="button" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-400 w-full" onClick={handleCancelUserEdit}>Cancel</button>
            </div>
          </form>
        </div>
      );

      // Users table
      const table = (
        <section aria-labelledby="users-heading" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-5xl mx-auto">
          <h2 id="users-heading" className="text-2xl font-bold mb-6 text-gray-800 tracking-tight">Users</h2>
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <input type="text" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" placeholder="Search name or email..." value={userSearch} onChange={e => { setUserSearch(e.target.value); setPage(1); }} aria-label="Search users" />
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }} aria-label="Filter by role">
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Moderator">Moderator</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} aria-label="Filter by status">
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
            {/* Items per page selector removed as requested */}
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Profile</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 cursor-pointer" onClick={() => handleSort('name')}>Name {sortField === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 cursor-pointer" onClick={() => handleSort('email')}>Email {sortField === 'email' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 cursor-pointer" onClick={() => handleSort('role')}>Role {sortField === 'role' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 cursor-pointer" onClick={() => handleSort('status')}>Status {sortField === 'status' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700 cursor-pointer" onClick={() => handleSort('created')}>Created {sortField === 'created' ? (sortDir === 'asc' ? '▲' : '▼') : ''}</th>
                  <th className="px-4 py-2 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedUsers.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-8 text-gray-400">No users found.</td></tr>
                ) : pagedUsers.map(user => (
                  <tr key={user.id} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-2 text-center">
                      <img src={user.profilePic} alt={user.name + ' profile'} className="w-10 h-10 rounded-full object-cover border border-gray-300 mx-auto" />
                    </td>
                    <td className="px-4 py-2 text-gray-900 font-medium">{user.name}</td>
                    <td className="px-4 py-2 text-gray-900">{user.email}</td>
                    <td className="px-4 py-2 text-gray-900">{user.role}</td>
                    <td className={`px-4 py-2 font-semibold ${user.status === 'Active' ? 'text-green-700' : user.status === 'Suspended' ? 'text-red-700' : 'text-yellow-700'}`}>{user.status}</td>
                    <td className="px-4 py-2 text-gray-900">{user.created}</td>
                    <td className="px-4 py-2 text-center flex gap-2 justify-center">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => handleEditUser(user)}>Edit</button>
                      <button className={`px-3 py-1 rounded-lg text-xs font-semibold shadow focus:outline-none focus:ring-2 ${user.status === 'Active' ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500 focus:ring-yellow-300' : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-300'}`} onClick={() => handleToggleStatus(user.id)}>{user.status === 'Active' ? 'Suspend' : 'Activate'}</button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">Page {page} of {totalPages}</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Prev</button>
              <button className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" disabled={page === totalPages || totalPages === 0} onClick={() => handlePageChange(page + 1)}>Next</button>
            </div>
          </div>
        </section>
      );
    // Add or update project
    function handleAddOrUpdate(project) {
      setProjects(prevProjects => {
        // If editing, update the project
        if (editingProject) {
          return prevProjects.map(p => p.id === project.id ? project : p);
        }
        // Otherwise, add new
        return [...prevProjects, project];
      });
      setEditingProject(null);
      // Save to localStorage
      try {
        const updated = editingProject
          ? projects.map(p => p.id === project.id ? project : p)
          : [...projects, project];
        localStorage.setItem('vanguard-admin-projects', JSON.stringify(updated));
      } catch {}
    }
  const [projects, setProjects] = useState(() => {
    // Load from localStorage if available
    try {
      const stored = localStorage.getItem('vanguard-admin-projects');
      return stored ? JSON.parse(stored) : initialProjects;
    } catch {
      return initialProjects;
    }
  });
  const [editingProject, setEditingProject] = useState(null);
  const [activeSection, setActiveSection] = useState('revenue'); // 'revenue' is now the default tab

  // Settings state
  const defaultSettings = {
    theme: 'light', // Always default to light
    enableNotifications: false,
  };
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem('vanguard-admin-settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Force theme to light on first load
        if (parsed.theme === 'dark') {
          parsed.theme = 'light';
          localStorage.setItem('vanguard-admin-settings', JSON.stringify(parsed));
        }
        return parsed;
      }
      return defaultSettings;
    } catch {
      return defaultSettings;
    }
  });
  const [settingsDraft, setSettingsDraft] = useState(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Dynamically apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme]);

  // Save settings to localStorage when settings change
  useEffect(() => {
    try {
      localStorage.setItem('vanguard-admin-settings', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  // Keep draft in sync if settings change elsewhere
  useEffect(() => {
    setSettingsDraft(settings);
  }, [settings]);


  // Settings handlers
  function handleSettingsDraftChange(e) {
    const { name, value, type, checked } = e.target;
    setSettingsDraft(draft => ({
      ...draft,
      [name]: type === 'checkbox' ? checked : value
    }));
    setSettingsSaved(false);
  }
  function handleSaveSettings(e) {
    e.preventDefault();
    setSettings(settingsDraft);
    setSettingsSaved(true);
  }
  function handleResetSettings(e) {
    e.preventDefault();
    setSettingsDraft(defaultSettings);
    setSettingsSaved(false);
  }


  function handleEdit(project) {
    setEditingProject(project);
  }

  function handleDelete(id) {
    setProjects(projects => projects.filter(p => p.id !== id));
    if (editingProject && editingProject.id === id) setEditingProject(null);
  }

  function handleCancelEdit() {
    setEditingProject(null);
  }

  // Navigation items
  // Navigation items with icons (Heroicons outline SVGs)
  const navItems = [
    { key: 'revenue', label: 'Revenue', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="12" width="3.5" height="8" rx="1"/><rect x="9.25" y="8" width="3.5" height="12" rx="1"/><rect x="15.5" y="4" width="3.5" height="16" rx="1"/></svg>
    ) },
    { key: 'users', label: 'Users', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4.5 19.5a7.5 7.5 0 0 1 15 0v.75a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75v-.75Z" /></svg>
    ) },
    { key: 'entries', label: 'Entries', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M8 12h8M8 16h4"/></svg>
    ) },
    { key: 'activityLogs', label: 'Activity Logs', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M8 12h8M8 16h4"/></svg>
    ) },
    { key: 'integrations', label: 'Integrations', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12a4.5 4.5 0 0 1 9 0m-9 0a4.5 4.5 0 0 0 9 0m-9 0H3m18 0h-4.5" /></svg>
    ) },
    { key: 'billing', label: 'Billing', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2"/><path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16"/></svg>
    ) },
    { key: 'systemHealth', label: 'System Health', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2.5 2.5L16 9"/></svg>
    ) },
    { key: 'support', label: 'Support', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 10c0-3.314-2.686-6-6-6S6 6.686 6 10c0 2.21 1.343 4.104 3.25 5.197V19l2.5-1.5 2.5 1.5v-3.803C16.657 14.104 18 12.21 18 10Z" /></svg>
    ) },
    { key: 'tickets', label: 'Tickets', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="2"/><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8"/></svg>
    ) },
    { key: 'settings', label: 'Settings', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    ) },
  ];

  // Collapsible sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
        setMobileSidebar(false);
      } else {
        setSidebarOpen(true);
        setMobileSidebar(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={
      'min-h-screen flex flex-col ' +
      (settings.theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100')
    }>
      {/* Mobile Hamburger & Header */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <header className="fixed top-0 left-0 w-full z-30 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 sm:px-6 h-16 transition-all duration-300 dark:bg-gray-900 dark:border-b-gray-800" style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: '112rem', backgroundColor: settings.theme === 'dark' ? '#111827' : '#fff'}}>
          <div className="flex items-center gap-3">
            {/* Hamburger for mobile */}
            <button
              className="md:hidden mr-2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label={mobileSidebar ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMobileSidebar(open => !open)}
              style={{ minWidth: '2.5rem' }}
            >
              <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileSidebar ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <img src="https://i.postimg.cc/VNx067yd/Favicon.png" alt="Vanguard Admin Logo" className="h-8 w-8 object-contain mr-2" style={{borderRadius: '6px'}} />
            <span className="text-xl font-bold tracking-tight" style={{color: (settings.theme === 'dark' ? '#fff' : '#000'), fontWeight: 'bold'}}>Vanguard Admin</span>
          </div>
          {/* Theme toggle and user avatar */}
          <div className="flex items-center gap-3">
            <button
              className="relative flex items-center h-10 w-20 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              aria-label={settings.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={settings.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setSettings(s => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))}
              style={{ minWidth: '4.5rem' }}
            >
              {/* Sun icon (left) */}
              <svg className="w-5 h-5 mx-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
              </svg>
              {/* Toggle indicator */}
              <span
                className={
                  'absolute top-1 left-1 w-8 h-8 rounded-full bg-white shadow transition-transform duration-300 border border-gray-300 ' +
                  (settings.theme === 'dark' ? 'translate-x-10' : 'translate-x-0')
                }
                style={{ willChange: 'transform' }}
              />
              {/* Moon icon (right) */}
              <svg className="w-5 h-5 mx-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 0 1 12.21 3a7 7 0 1 0 8.79 9.79z" />
              </svg>
            </button>
            <UserAvatarDropdown onSettings={() => setActiveSection('settings')} />
          </div>
        </header>
        {/* Sidebar for desktop */}
        <aside
          className={
            `z-20 hidden md:flex flex-col h-[700px] bg-white dark:bg-white dark:shadow-xl border-t-4 border-t-blue-500 dark:border-t-blue-700 dark:border dark:border-gray-700 rounded-2xl pt-4 pb-2 px-2 mr-8 mt-20
            transition-all duration-300 ease-in-out shadow-lg
            ${sidebarOpen ? 'w-56 opacity-100' : 'w-20 opacity-95'}
            `
          }
          style={{ minWidth: sidebarOpen ? '14rem' : '5rem', maxWidth: sidebarOpen ? '14rem' : '5rem', marginTop: '5rem' }}
        >
          {/* Sidebar Toggle Button */}
          <button
            className="absolute -right-4 top-8 z-30 bg-white border border-gray-200 shadow rounded-full p-2 md:p-1.5 flex items-center justify-center transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{ transform: sidebarOpen ? 'translateX(50%)' : 'translateX(50%) rotate(180deg)' }}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            onClick={() => setSidebarOpen(open => !open)}
          >
            {/* Chevron icon */}
            <svg className="w-6 h-6 text-blue-600 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className={`text-black font-semibold text-lg mb-6 tracking-wide transition-all duration-300 ${sidebarOpen ? 'opacity-100 ml-2' : 'opacity-0 ml-[-8px] pointer-events-none h-0 overflow-hidden'}`}>Navigation</div>
          <ul className="space-y-2 flex-1">
            {navItems.map(item => (
              <li key={item.key}>
                <button
                  className={
                    'flex items-center w-full px-2 py-3 md:py-2 rounded-lg font-medium transition-all duration-200 group ' +
                    (activeSection === item.key
                      ? 'bg-blue-600 text-white shadow-lg dark:shadow-blue-900'
                      : 'bg-white dark:bg-white text-black hover:bg-blue-50 border border-gray-200 dark:border-gray-700')
                  }
                  onClick={() => {
                    setActiveSection(item.key);
                  }}
                  aria-current={activeSection === item.key ? 'page' : undefined}
                  style={{ minHeight: '48px' }}
                >
                  <span className="flex-shrink-0 mr-0.5">{item.icon}</span>
                  <span
                    className={
                      'ml-3 transition-all duration-200 whitespace-nowrap ' +
                      (sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 pointer-events-none')
                    }
                  >{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
          {/* Optional: Add a logo or brand at the bottom */}
          <div className={`mt-4 mb-2 flex items-center justify-center transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none h-0 overflow-hidden'}`} style={{ minHeight: sidebarOpen ? '2.5rem' : 0 }}>
            <img src="https://i.postimg.cc/9QprVW1c/Full-Logo.png" alt="Vanguard Admin Full Logo" className="h-10 w-auto object-contain" />
          </div>
        </aside>
        {/* Mobile Sidebar Drawer */}
        <div
          className={
            `fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileSidebar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`
          }
          aria-hidden={!mobileSidebar}
        >
          <div className={`absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ${mobileSidebar ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileSidebar(false)} />
          <aside
            className={`absolute left-0 top-0 h-full w-64 bg-white shadow-xl border-t-4 border-t-blue-500 rounded-r-2xl pt-4 pb-2 px-2 transition-transform duration-300 mobile-nav-menu ${mobileSidebar ? 'translate-x-0' : '-translate-x-full'}`}
            style={{ minWidth: '16rem', maxWidth: '16rem' }}
          >
            <div className="text-black font-semibold text-lg mb-6 tracking-wide">Navigation</div>
            <ul className="space-y-2 flex-1">
              {navItems.map(item => (
                <li key={item.key}>
                  <button
                    className={
                      'flex items-center w-full px-2 py-3 rounded-lg font-medium transition-all duration-200 group ' +
                      (activeSection === item.key
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-black hover:bg-blue-50 border border-gray-200')
                    }
                    onClick={() => {
                      setActiveSection(item.key);
                      setMobileSidebar(false);
                    }}
                    aria-current={activeSection === item.key ? 'page' : undefined}
                    style={{ minHeight: '48px' }}
                  >
                    <span className="flex-shrink-0 mr-0.5">{item.icon}</span>
                    <span className="ml-3 whitespace-nowrap">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 mb-2 flex items-center justify-center">
              <img src="https://i.postimg.cc/9QprVW1c/Full-Logo.png" alt="Vanguard Admin Full Logo" className="h-10 w-auto object-contain" />
            </div>
          </aside>
        </div>
        <main className="flex-1 pt-20 py-6 px-1 sm:py-10 sm:px-2 md:px-0 transition-all duration-500 ease-out" style={{ minHeight: '600px' }}>

                                {/* Add bigger gap below top banner */}
                                <div className="mt-12" />
                                        {activeSection === 'systemHealth' && (
                                          <SystemHealthSection />
                                        )}
                                        {activeSection === 'support' && (
                                          <SupportSection />
                                        )}
                                        {activeSection === 'tickets' && (
                                          <TicketsSection onLogTicket={logTicketChange} />
                                        )}
                              {activeSection === 'billing' && (
                                <BillingSection />
                              )}
                              {activeSection === 'integrations' && (
                                <IntegrationsSection onLogIntegration={logIntegrationChange} />
                              )}
                              {activeSection === 'activityLogs' && (
                                <ActivityLogsSection logs={logs} />
                              )}
                              {activeSection === 'entries' && (
                                <>
                                  <VanguardAdminProjectForm
                                    onAdd={handleAddOrUpdate}
                                    editingProject={editingProject}
                                    onCancelEdit={handleCancelEdit}
                                  />
              <section aria-labelledby="records-heading">
                <h2 id="records-heading" className="text-2xl font-bold mb-6 text-gray-800 tracking-tight vanguard-entries-heading">Entries</h2>
                {projects.length === 0 ? (
                  <div className="text-gray-400 text-center py-12 text-lg border-2 border-dashed border-gray-200 rounded-xl bg-white shadow-sm">No entries found. Use the form above to create one.</div>
                ) : (
                  <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map(project => (
                      <li
                        key={project.id}
                        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-100 vanguard-admin-card-hover transition-transform duration-150 hover:shadow-2xl hover:-translate-y-1 group"
                      >
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">{project.name}</h3>
                          <p className="text-gray-600 text-base mb-2">{project.description}</p>
                        </div>
                        <div className="mt-4 flex gap-3">
                          <button
                            className="bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-lg font-semibold shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 transition"
                            onClick={() => handleEdit(project)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-1.5 rounded-lg font-semibold shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition"
                            onClick={() => handleDelete(project.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </>
          )}
          {activeSection === 'revenue' && (
            <RevenueDashboard />
          )}
          {activeSection === 'users' && (
            <>
              {editModal}
              {table}
            </>
          )}
          {activeSection === 'settings' && (
            <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-xl mx-auto" aria-labelledby="settings-heading">
              <h2 id="settings-heading" className="text-2xl font-bold mb-6 text-gray-800 tracking-tight">Settings</h2>
              {/* Change Password Section */}
              <div className="mb-10">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Change Password</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="current-password">Current Password</label>
                    <input id="current-password" type="password" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base" required />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="new-password">New Password</label>
                    <input id="new-password" type="password" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base" required />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="confirm-password">Confirm New Password</label>
                    <input id="confirm-password" type="password" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base" required />
                  </div>
                  <button type="button" className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition w-full" onClick={() => window.alert('Password changed successfully! (demo only)')}>Change Password</button>
                </div>
              </div>

              {/* Update Email Section */}
              <div className="mb-10">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Update Email</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="new-email">New Email Address</label>
                    <input id="new-email" type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-base" required />
                  </div>
                  <button type="button" className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition w-full" onClick={() => window.alert('Email updated successfully! (demo only)')}>Update Email</button>
                </div>
              </div>

              <form className="space-y-6" aria-label="Admin Settings" onSubmit={handleSaveSettings}>
                {/* Enable Notifications Toggle */}
                <div className="flex items-center justify-between">
                  <label htmlFor="enableNotifications" className="block text-gray-700 font-medium">Enable Notifications</label>
                  <input
                    id="enableNotifications"
                    name="enableNotifications"
                    type="checkbox"
                    checked={!!settingsDraft.enableNotifications}
                    onChange={handleSettingsDraftChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="theme" className="block text-gray-700 font-medium">Theme Preference</label>
                  <button
                    type="button"
                    aria-pressed={settingsDraft.theme === 'dark'}
                    aria-label={settingsDraft.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    className={
                      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ' +
                      (settingsDraft.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300')
                    }
                    onClick={() => setSettingsDraft(d => ({ ...d, theme: d.theme === 'dark' ? 'light' : 'dark' }))}
                  >
                    <span className={
                      'inline-block h-4 w-4 transform rounded-full bg-white shadow transition ' +
                      (settingsDraft.theme === 'dark' ? 'translate-x-6' : 'translate-x-1')
                    } />
                  </button>
                  <span className="ml-3 text-black text-sm">{settingsDraft.theme === 'dark' ? 'Dark' : 'Light'}</span>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save Settings</button>
                  <button type="button" className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" onClick={onLogOut}>Log Out</button>
                </div>
                {settingsSaved && <div className="text-green-600 text-sm font-semibold pt-2" role="status">Settings saved!</div>}
              </form>
            </section>
          )}
        </main>
      </div>
      <footer className="bg-gray-200 border-t border-gray-300 py-4 mt-10 dark:bg-gray-900 dark:border-gray-800" style={{backgroundColor: settings.theme === 'dark' ? undefined : '#f1f5f9'}}>
        <div className={`max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between`}>
          <span className="text-sm font-medium" style={{color: (settings.theme === 'dark' ? '#fff' : '#000'), fontWeight: '500'}}>© {new Date().getFullYear()} Vanguard Admin</span>
          <img
            src="https://i.postimg.cc/RhSzGJRm/Text-Logo.png"
            alt="Vanguard Admin Text Logo"
            className="h-14 w-auto object-contain mt-2 sm:mt-0"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          />
        </div>
      </footer>
    </div>
  );
}

// Vanguard Admin: Demo Login Page with Real Admin Tool Redirect (Main Entry Page)
// This is the default entry point for Vanguard Admin.
// After successful login, the user is routed to the existing Vanguard Admin UI (Dashboard).


function VanguardAdminLogin({ onLogin }) {
  // State for form fields and error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // Animation states
  const [showLogo, setShowLogo] = useState(false);
  const [showForm, setShowForm] = useState(false);
  // Accessibility: reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    setShowLogo(true);
    if (prefersReducedMotion) {
      setShowForm(true);
    } else {
      const timer = setTimeout(() => setShowForm(true), 600);
      return () => clearTimeout(timer);
    }
  }, [prefersReducedMotion]);

  // Demo credentials
  const demoEmail = 'demo@admin.com';
  const demoPassword = 'admin123';

  // Simulate login handler
  function handleLogin(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }
    if (email !== demoEmail || password !== demoPassword) {
      setError('Invalid credentials. Use demo@admin.com / admin123');
      return;
    }
    setError('');
    // Real redirect: call onLogin to show the admin tool UI
    onLogin();
    setTimeout(() => {
      const emailInput = document.getElementById('email');
      if (emailInput) emailInput.focus();
    }, 400);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className="mb-0 flex flex-col items-center p-0 m-0" style={{ minHeight: 0, backgroundColor: 'transparent' }}>
        <img
          src="https://i.postimg.cc/gJQbGY63/Chat-GPT-Image-Jan-30-2026-11-21-20-PM-(1).png"
          alt="Vanguard Admin Logo"
          className={
            `h-40 w-40 sm:h-60 sm:w-60 object-contain drop-shadow-lg m-0 p-0 transition-all duration-700 ease-out ${showLogo ? 'opacity-100 scale-105' : 'opacity-0 scale-95'}`
          }
          style={{ background: 'transparent', border: 'none', marginBottom: '-2rem' }}
          aria-hidden={showLogo ? 'false' : 'true'}
        />
      </header>
      <form
        className={
          `bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md border border-gray-200 transition-all duration-700 ease-out ${showForm ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`
        }
        onSubmit={handleLogin}
        autoComplete="off"
        tabIndex={showForm ? 0 : -1}
        aria-hidden={showForm ? 'false' : 'true'}
      >
        <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">Sign In</h2>
        <div className="mb-4 text-gray-500 text-sm text-center">
          Demo login: <span className="font-mono">demo@admin.com</span> / <span className="font-mono">admin123</span>
        </div>
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center font-semibold">
            {error}
          </div>
        )}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoFocus={showForm}
            disabled={!showForm}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={!showForm}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={!showForm}
        >
          Login
        </button>
      </form>
      <footer className="mt-10 text-gray-400 text-sm text-center" style={{backgroundColor: 'transparent'}}>
        &copy; {new Date().getFullYear()} Vanguard Admin
      </footer>
    </div>
  );
}

// Vanguard Admin: Main entry point
// This renders the login page first, then redirects to the real admin tool UI after login.
// To add real routing, replace the state logic with React Router v6 or your preferred solution.
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogOut() {
    setLoggedIn(false);
  }

  // Debug: show a message to confirm React is rendering
  if (typeof window !== 'undefined') {
    window.__REACT_RENDERED = true;
  }

  // Show dashboard after login, otherwise show login page
  return loggedIn
    ? <VanguardAdminDashboard onLogOut={handleLogOut} />
    : <VanguardAdminLogin onLogin={() => setLoggedIn(true)} />;
}

// Render the app
ReactDOM.createRoot(document.getElementById("vanguard-admin-root")).render(<App />);
