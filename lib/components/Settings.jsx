import { React } from 'uebersicht'
import { classnames } from '../utils.js'
import { CloseIcon } from './Icons.jsx'

import { getSettings, setSettings, settingsLabels } from '../settings.js'

const { useState, useEffect, useCallback } = React

const Settings = () => {
  const [visible, setVisible] = useState(false)
  const settings = getSettings()

  const closeSettings = () => {
    setVisible(false)
    console.log('click')
  }

  const onKeydown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && (e.which === 188 || e.keyCode === 188)) {
      setVisible(true)
    }
  }, [])

  const onThemeChange = (e) => setSettings('global', 'theme', e.target.value)

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [])

  const classes = classnames('settings', {
    'settings--visible': visible
  })

  return (
    <div className={classes}>
      <div className="settings__overlay" onClick={closeSettings} />
      <div className="settings__outer">
        <div className="settings__header">
          Settings
          <CloseIcon className="settings__close" onClick={closeSettings} />
        </div>
        <div className="settings__inner">
          <div className="settings__inner-title">Widgets</div>
          <div className="settings__items">
            {Object.keys(settings.widgets).map((key) => {
              const setting = settings.widgets[key]
              const onWidgetChange = (e) => setSettings('widgets', key, e.target.checked, 'data')
              return (
                <div key={key} className="settings__item">
                  <input id={key} type="checkbox" defaultChecked={setting} onChange={onWidgetChange} />
                  <label htmlFor={key}>{settingsLabels[key]}</label>
                </div>
              )
            })}
          </div>
          <div className="settings__inner-title">Theme</div>
          <div className="settings__items" onChange={onThemeChange}>
            <div className="settings__item">
              <input
                name="theme"
                id="auto"
                value="auto"
                type="radio"
                defaultChecked={settings.global.theme === 'auto'}
              />
              <label htmlFor="auto">Auto (system)</label>
            </div>
            <div className="settings__item">
              <input
                name="theme"
                id="dark"
                value="dark"
                type="radio"
                defaultChecked={settings.global.theme === 'dark'}
              />
              <label htmlFor="dark">Dark</label>
            </div>
            <div className="settings__item">
              <input
                name="theme"
                id="light"
                value="light"
                type="radio"
                defaultChecked={settings.global.theme === 'light'}
              />
              <label htmlFor="light">Light</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings