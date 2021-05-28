import { shell, BrowserWindow } from 'electron';

export default (mainWindow: BrowserWindow) => [
  {
    label: '&File',
    submenu: [
      {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click: () => {
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.close();
          }
        },
      },
    ],
  },
  {
    label: '&View',
    submenu:
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? [
            {
              label: '&Reload',
              accelerator: 'Ctrl+R',
              click: () => {
                mainWindow.webContents.reload();
              },
            },
            {
              label: 'Toggle &Full Screen',
              accelerator: 'F11',
              click: () => {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
              },
            },
            {
              label: 'Toggle &Developer Tools',
              accelerator: 'Alt+Ctrl+I',
              click: () => {
                mainWindow.webContents.toggleDevTools();
              },
            },
          ]
        : [
            {
              label: 'Toggle &Full Screen',
              accelerator: 'F11',
              click: () => {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
              },
            },
          ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Documentation',
        click() {
          shell.openExternal('https://github.com/jopemachine/arvis/blob/master/README.md');
        },
      },
      {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/jopemachine/arvis/issues');
        },
      },
      {
        label: 'Search available workflows',
        click() {
          shell.openExternal('https://github.com/jopemachine/arvis/blob/master/documents/workflow-links.md');
        },
      },
      {
        label: 'Search available plugins',
        click() {
          shell.openExternal('https://github.com/jopemachine/arvis/blob/master/documents/plugin-links.md');
        },
      },
    ],
  },
];
