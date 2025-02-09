import { Text } from 'preact-i18n';
import cx from 'classnames';

import style from './style.css';
import { RequestStatus } from '../../../../../utils/consts';

const createDevice = (props, device) => () => {
  props.createDevice(device);
};

const FoundDevices = ({ children, ...props }) => (
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">
        <Text id="integration.philipsHue.device.deviceOnNetworkTitle" />
      </h3>
    </div>
    <div class="card-body">
      <div
        class={cx('dimmer', {
          active:
            props.getPhilipsHueNewDevicesStatus === RequestStatus.Getting ||
            props.getPhilipsHueCreateDeviceStatus === RequestStatus.Getting
        })}
      >
        <div class="loader" />
        <div class="dimmer-content">
          {props.getPhilipsHueNewDevicesStatus === RequestStatus.Getting && <div class={style.emptyDiv} />}
          <div class="row">
            {props.philipsHueNewDevices &&
              props.philipsHueNewDevices.map((device, index) => (
                <div class="col-md-4">
                  <div class="card">
                    <div class="card-header">
                      <h3 class="card-title">{device.name}</h3>
                    </div>
                    <div class="card-body">
                      {!device.not_handled && (
                        <button class="btn btn-success" onClick={createDevice(props, device)}>
                          <Text id="integration.philipsHue.device.connectButton" />
                        </button>
                      )}
                      {device.not_handled && (
                        <div class="alert alert-warning">
                          <Text id="integration.philipsHue.device.deviceNotHandled" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {props.philipsHueDevices && props.philipsHueDevices.length === 0 && (
              <Text id="integration.philipsHue.device.noDevices" />
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FoundDevices;
