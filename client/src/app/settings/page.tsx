'use client';
import { useState } from 'react';
import Header from '@/app/(components)/Header';

type UserSetting = {
  label: string;
  value: string | boolean;
  type: 'text' | 'toggle';
};

const mockSettings: UserSetting[] = [
  {
    label: 'Username',
    value: 'john_doe',
    type: 'text',
  },
  {
    label: 'Email',
    value: 'john.doe@example.com',
    type: 'text',
  },
  {
    label: 'Notification',
    value: true,
    type: 'toggle',
  },
  {
    label: 'Dark Mode',
    value: false,
    type: 'toggle',
  },
  {
    label: 'Language',
    value: 'English',
    type: 'text',
  },
];
const Settings = () => {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);
  const [statusMessage, setStatusMessage] = useState('');

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };
  return (
    <div className="w-full" data-testid="settings-page">
      <Header name="User Settings" />
      {statusMessage && (
        <div className="mt-3 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700" data-testid="settings-status">
          {statusMessage}
        </div>
      )}
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left px-4 py-3 uppercase font-semibold text-sm">
                Settings
              </th>
              <th className="text-left px-4 py-3 uppercase font-semibold text-sm">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="px-4 py-2">{setting.label}</td>
                <td className="px-4 py-2">
                  {setting.type === 'toggle' ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                        data-testid={`settings-toggle-${setting.label.toLowerCase().replace(/\s+/g, '-')}`}
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"
                      ></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                      data-testid={`settings-input-${setting.label.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-3 p-4 border-t bg-gray-50">
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
            onClick={() => setStatusMessage('Settings saved locally.')}
            data-testid="save-settings"
          >
            Save
          </button>
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
            onClick={() => {
              setUserSettings(mockSettings);
              setStatusMessage('Settings reset to defaults.');
            }}
            data-testid="reset-settings"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
