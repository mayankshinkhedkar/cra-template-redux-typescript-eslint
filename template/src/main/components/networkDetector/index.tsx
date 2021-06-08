import React, { PureComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import config from '../../config';
import { getBase64OfsvgURL } from '../../utilities/common';
import logger from '../../utilities/logger';
import { GlobalLoader } from '../helping/loader';

interface NetworkDetectorProps {

};

interface NetworkDetectorState {
  isDisconnected: boolean;
  imageIsCached: boolean;
  base64Img: string;
  baseUrl: string;
};

export default class NetworkDetector extends PureComponent<NetworkDetectorProps, NetworkDetectorState> {
  constructor (props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      isDisconnected: false,
      imageIsCached: false,
      base64Img: '',
      baseUrl: config.NODE_ENV !== 'production' ? window.location.origin : config.BASE_URL
    };
  }

  componentDidMount () {
    this.handleConnectionChange();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
  }

  componentWillUnmount () {
    window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
      const webPing = setInterval(
        () => {
          fetch(this.state.baseUrl, {
            mode: 'no-cors'
          })
            .then(() => {
              this.updateConnectionStatus(false);
              return clearInterval(webPing);
            }).catch(() => this.updateConnectionStatus());
        }, 2000);
      return;
    }

    return this.updateConnectionStatus();
  }

  updateConnectionStatus = (isDisconnected = true) => {
    this.setState({ isDisconnected }, async () => {
      if (!this.state.imageIsCached) {
        try {
          const srcURL = `${this.state.baseUrl}/images/no_internet_connection.svg`; // by setting an src, you trigger browser download
          const base64Img: any = await getBase64OfsvgURL(srcURL);
          this.setState({
            imageIsCached: true,
            base64Img
          });
        } catch (error) {
          logger({ error });
        }
      }
    });
  }

  render () {
    const { isDisconnected, imageIsCached, base64Img } = this.state;
    return (
      <Dialog
        open={isDisconnected}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Use Google\'s location service?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              {
                imageIsCached && <img className="img-fluid" src={base64Img} alt="noInternetLogo" />
              }
              {
              // imageIsCached && (
              //   <img className="img-fluid" src={'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MjAiIGhlaWdodD0iNTIwIiB2aWV3Qm94PSIwIDAgNTIwIDUyMCI+DQogIDxnIGlkPSJHcm91cF8zNjUzMyIgZGF0YS1uYW1lPSJHcm91cCAzNjUzMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQxIC05NDgxKSI+DQogICAgPHJlY3QgaWQ9IlJlY3RhbmdsZV81OTM2IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSA1OTM2IiB3aWR0aD0iNTIwIiBoZWlnaHQ9IjUyMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0MSA5NDgxKSIgZmlsbD0ibm9uZSIvPg0KICAgIDxnIGlkPSJHcm91cF8zNjUzMiIgZGF0YS1uYW1lPSJHcm91cCAzNjUzMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzNDggODY2NSkiPg0KICAgICAgPGcgaWQ9Ikdyb3VwXzM2NTExIiBkYXRhLW5hbWU9Ikdyb3VwIDM2NTExIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzA3MC40MzIgLTU5MTYuMjI4KSI+DQogICAgICAgIDxwYXRoIGlkPSJjbG91ZF8xXyIgZGF0YS1uYW1lPSJjbG91ZCAoMSkiIGQ9Ik05NS42LDEyMi42ODNhOTUuNDg2LDk1LjQ4NiwwLDAsMSwxOC45MzEsMS44OTNBNzguMDc0LDc4LjA3NCwwLDAsMSwyMjMuODc5LDY5LjA2N2ExMDQuMjEsMTA0LjIxLDAsMSwxLDE5NS45MDgsNzEuMTI1LDg2Ljg3LDg2Ljg3LDAsMCwxLTIuNjEsMTczLjdIOTUuNmE5NS42LDk1LjYsMCwwLDEsMC0xOTEuMjA3Wm0wLDAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMTA0OS41NDkgNjg1Mi43NTMpIiBmaWxsPSJyZ2JhKDI0OSw3NCwxMzYsMC4xOCkiLz4NCiAgICAgICAgPHBhdGggaWQ9ImNsb3VkXzFfMiIgZGF0YS1uYW1lPSJjbG91ZCAoMSkiIGQ9Ik00NC4zMTksNTcuMDgzYTQ0LjI2NSw0NC4yNjUsMCwwLDEsOC43NzYuODc3LDM2LjE5MywzNi4xOTMsMCwwLDEsNTAuNjktMjUuNzMzQTQ4LjMxLDQ4LjMxLDAsMSwxLDE5NC42MDUsNjUuMmE0MC4yNzEsNDAuMjcxLDAsMCwxLTEuMjEsODAuNTIzSDQ0LjMxOWE0NC4zMiw0NC4zMiwwLDAsMSwwLTg4LjY0Wm0wLDAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMDkwOS4zOTUgNjgxNi44MzYpIiBmaWxsPSJyZ2JhKDI0OSw3NCwxMzYsMC4xOCkiLz4NCiAgICAgICAgPHBhdGggaWQ9ImNsb3VkXzFfMyIgZGF0YS1uYW1lPSJjbG91ZCAoMSkiIGQ9Ik0zNTEuNDMzLDEwNS42NDhhODIuMTg0LDgyLjE4NCwwLDAsMC0xNi4yOTQsMS42MjlBNjcuMiw2Ny4yLDAsMCwwLDI0MS4wMjUsNTkuNSw4OS42OTQsODkuNjk0LDAsMSwwLDcyLjQwNiwxMjAuNzE4YTc0Ljc2OSw3NC43NjksMCwwLDAsMi4yNDYsMTQ5LjVIMzUxLjQzM2E4Mi4yODYsODIuMjg2LDAsMSwwLDAtMTY0LjU3MlptMCwwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTEwNjAuNDMxIDY4NDIuMzM1KSIgZmlsbD0icmdiYSgyNDIsNjMsMTI3LDAuNzIpIi8+DQogICAgICAgIDxnIGlkPSJpbnRlcm5ldCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwOTA5LjgwNiA2OTIxLjE3MykiPg0KICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzY1MjQ2IiBkYXRhLW5hbWU9IlBhdGggNjUyNDYiIGQ9Ik0xMDAuNzQyLDIwMS40ODRBMTAwLjc0MiwxMDAuNzQyLDAsMSwxLDIwMS40ODQsMTAwLjc0MiwxMDAuODU0LDEwMC44NTQsMCwwLDEsMTAwLjc0MiwyMDEuNDg0Wm0wLTE4OC44OTFhODguMTQ5LDg4LjE0OSwwLDEsMCw4OC4xNDksODguMTQ5QTg4LjI0Niw4OC4yNDYsMCwwLDAsMTAwLjc0MiwxMi41OTNaIiBmaWxsPSIjZmZmIi8+DQogICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNjUyNDciIGRhdGEtbmFtZT0iUGF0aCA2NTI0NyIgZD0iTTM2Ljg4OSwzMS40MzVBNi4yODcsNi4yODcsMCwwLDEsMzIuNDQsMjkuNiw4NS4yNDQsODUuMjQ0LDAsMCwwLDIwLjE3NCwxOS40Myw2LjI5Miw2LjI5MiwwLDAsMSwyNy4yNDMsOS4wMmE5Ny42ODYsOTcuNjg2LDAsMCwxLDE0LjEsMTEuNjYxLDYuMjkyLDYuMjkyLDAsMCwxLTQuNDU4LDEwLjc1NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyOC43NDggNTguNTYxKSIgZmlsbD0iI2ZmZiIvPg0KICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzY1MjQ4IiBkYXRhLW5hbWU9IlBhdGggNjUyNDgiIGQ9Ik05LjgyMSw0NS42MzhBNi4zLDYuMywwLDAsMSw1LjM1NSwzNC44OTNDMjguNTM0LDExLjYyMSw2MC43NzEsMS4zNjIsOTQuMzk0LDcuOTY5YTYuMyw2LjMsMCwxLDEtMi40MjYsMTIuMzY2Yy0yOS41MzQtNS44MTgtNTcuNDksMy4xNTctNzcuNywyMy40NDhhNi4yNTYsNi4yNTYsMCwwLDEtNC40NDksMS44NTVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMjYgNDQuMzU4KSIgZmlsbD0iI2ZmZiIvPg0KICAgICAgICAgIDxwYXRoIGlkPSJQYXRoXzY1MjQ5IiBkYXRhLW5hbWU9IlBhdGggNjUyNDkiIGQ9Ik0zNC43MTMsMzMuNjkyYTYuMjg3LDYuMjg3LDAsMCwxLTQuNDQ5LTEuODM5QTU2LjIsNTYuMiwwLDAsMCwxNy44OCwyMi40ODRhNi4zLDYuMywwLDEsMSw2LjEzNy0xMS4wMDZBNjkuNTMyLDY5LjUzMiwwLDAsMSwzOS4xNzEsMjIuOTI5YTYuMyw2LjMsMCwwLDEtNC40NTgsMTAuNzYzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA4LjM0MSA3OC45NzIpIiBmaWxsPSIjZmZmIi8+DQogICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNjUyNTAiIGRhdGEtbmFtZT0iUGF0aCA2NTI1MCIgZD0iTTEyLjUsMzguNjQyQTYuMyw2LjMsMCwwLDEsOC4wNTUsMjcuODg4YTY0Ljk1Niw2NC45NTYsMCwwLDEsMzIuMDctMTcuNzMxLDYuMyw2LjMsMCwwLDEsMi42OTUsMTIuM0E1Mi40ODYsNTIuNDg2LDAsMCwwLDE2Ljk2MiwzNi44LDYuMjk0LDYuMjk0LDAsMCwxLDEyLjUsMzguNjQyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDUuOTI2IDc0LjAyMSkiIGZpbGw9IiNmZmYiLz4NCiAgICAgICAgICA8cGF0aCBpZD0iUGF0aF82NTI1MSIgZGF0YS1uYW1lPSJQYXRoIDY1MjUxIiBkPSJNMjcuNjgzLDQ5Ljc5NWExOC4xODYsMTguMTg2LDAsMCwxLTE3LjYtMTMuNTA4LDYuMyw2LjMsMCwwLDEsMTIuMTgxLTMuMkE1LjUsNS41LDAsMCwwLDI3LjY4MywzNy4yYTUuNzE1LDUuNzE1LDAsMCwwLDUuNzA5LTUuNzA5LDUuNTA5LDUuNTA5LDAsMCwwLTQuMTE0LTUuNDE1LDYuMyw2LjMsMCwwLDEsMy4yLTEyLjE4MSwxOC4yNjQsMTguMjY0LDAsMCwxLTQuNzk0LDM1LjlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3My4wNTkgMTAxLjMxOCkiIGZpbGw9IiNmZmYiLz4NCiAgICAgICAgICA8cGF0aCBpZD0iUGF0aF82NTI1MiIgZGF0YS1uYW1lPSJQYXRoIDY1MjUyIiBkPSJNOS41OTIsMTQ5LjQyMmE2LjMsNi4zLDAsMCwxLTQuNDQ5LTEwLjc1NEwxMzguNjc2LDUuMTQyYTYuMyw2LjMsMCwwLDEsOC45MDcsOC45MDdMMTQuMDQxLDE0Ny41NzVhNi4yNDcsNi4yNDcsMCwwLDEtNC40NDksMS44NDdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNC4zODQgMjQuMzg0KSIgZmlsbD0iI2ZmZiIvPg0KICAgICAgICA8L2c+DQogICAgICA8L2c+DQogICAgPC9nPg0KICA8L2c+DQo8L3N2Zz4NCg=='} alt="noInternetLogo" />
              // )
              }
              <strong className="font-med h-18 theme-color">No Internet Connection</strong>
              <GlobalLoader />
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}
