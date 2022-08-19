import {
  Box,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import './SaveOnInsuranceStyles.css';

const Color = React.memo(
  ({ color }) => <Box bg={color} h="12px" w="12px" borderRadius="50%" />,
  (prevProps, nextProps) => prevProps.color === nextProps.color,
);

Color.propTypes = { color: PropTypes.string.isRequired };

/*
Questions:
- What does initializeAutoComplete do?

*/

function SaveOnInsurance() {
  window.$('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true,
    callbacks: {
      open() {
        // eslint-disable-next-line no-console
        console.log('Inside the callback');
        window.Obie.init({
          partnerId: '69214a56-7199-48a2-861d-27518409407c',
          sandbox: false,
        });
        window.initializeAutocomplete();
      },
    },
  });
  //
  window.$('.obie-form').submit((e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    // const property = document.getElementById('location').value;
    window.analytics.track('lp_lead', { email, sfdc_Lead_Source: 'LP_Insurance' }, { integrations: { Salesforce: true } });
    window.address = window.streetNumber === '' ? window.addressLine1 : `${window.streetNumber} ${window.addressLine1}`;
    // const targetUrl = `https://insurance.obierisk.com/api/instant-estimate?partnerId=69214a56-7199-48a2-861d-27518409407c&addressLine1=${encodeURIComponent(address)}&city=${city}&state=${state}&postalCode=${postalCode}`;
    window.analytics.track('lp_lead', {
      email,
      sfdc_Lead_Source: 'LP_Insurance',
    });

    const sandboxStatus = false;
    const partnerIdKey = '69214a56-7199-48a2-861d-27518409407c';
    window.Obie.open({
      sandbox: sandboxStatus,
      partnerId: partnerIdKey,
      values: {
        person: { email },
        property: {
          // eslint-disable-next-line max-len
          addressLine1: window.address, city: window.city, state: window.state, postalCode: window.postalCode,
        },
      },
    });

    // window.$.ajax({
    //   method: 'GET', url: targetUrl, dataType: 'json', beforeSend() {},
    // })
    //   .fail(() => {
    //     window.$('#obie-toggle-modal').click();
    //   })
    //   .done((data) => {
    //     window.$('#obie-toggle-modal').click();
    //   });
  });
  //
  window.$('#obie-toggle-modal').click(() => {

  });

  // Causes issues when loaded with JS;
  // const magnificInputScript = document.createElement("script");
  // magnificInputScript.src = magnificScr;
  // magnificInputScript.async = true;
  // document.body.appendChild(magnificInputScript);

  const [obieInitModalIsOpen, setObieInitModalIsOpen] = React.useState(false);
  const [obieResultModalIsOpen, setObieResultModalIsOpen] = React.useState(false);

  // window.$('.insurance-popup-link').magnificPopup({
  //   type: 'inline',
  //   midClick: true,
  //   callbacks: {
  //     open() {
  //       // eslint-disable-next-line no-console
  //       console.log('Inside the callback');
  //       window.Obie.init({
  //         partnerId: '69214a56-7199-48a2-861d-27518409407c',
  //         sandbox: false,
  //       });
  //     },
  //   },
  // });
  //
  // window.$('#insurance-modal-wrap').magnificPopup({
  //   type: 'inline',
  //   midClick: true,
  //   callbacks: {
  //     open() {
  //       // eslint-disable-next-line no-console
  //       console.log('Inside the callback');
  //       window.Obie.init({
  //         partnerId: '69214a56-7199-48a2-861d-27518409407c',
  //         sandbox: false,
  //       });
  //     },
  //   },
  // });

  // function handleObieSubmit(event) {
  // event.preventDefault();
  // setObieInitModalIsOpen(false);
  // setObieResultModalIsOpen(true);
  // console.log('Launching Obie');
  // window.Obie.init({
  //   partnerId: '69214a56-7199-48a2-861d-27518409407c',
  //   sandbox: false,
  // });
  // window.initializeAutocomplete();
  // }

  function closeObieInitModal() {
    setObieInitModalIsOpen(false);
  }

  function triggerPopupInParentPage() {
    console.log('Triggering parent popup');
    // const obieEvent = new Event('launchObieEvent');
    // window.parent.$('body').trigger('launchObieEvent');
    window.parent.postMessage('openInsuranceUI', '*');
    console.log('Posted message');
  }

  return (
    <>
      <div className="tabcontent12" id="save-on-insurance">
        <div className="save-on-insurance">
          <div className="save-on-insurance-text">
            <h3>Landloard Insurance that is right for you!</h3>
            <br />
            <ul>
              <li>Make sure you have the right coverage</li>
              <li>Check if you can save $100's on existing policy</li>
              <li>No phone call or hassle required</li>
            </ul>
            <a id="insurance-content-quote1" href="#insurance-modal-wrap" className="open-popup-link primary-cta-button tertiary-button">Get an Instant Quote</a>
            {/* <button id="triggerInsurancePopup" onClick={triggerPopupInParentPage} className="primary-cta-button tertiary-button ">Get an Instant Quote</button> */}
          </div>
          <div className="save-on-insurance-image">
            <img src="https://www.baselane.com/wp-content/uploads/2022/07/Content.png" srcSet="https://www.baselane.com/wp-content/uploads/2022/07/Content.png 1x, https://www.baselane.com/wp-content/uploads/2022/07/Content@2x.png 2x" alt="" />

          </div>
        </div>
        <div id="insurance-modal-wrap" className="mfp-hide">
          <div className="insurance-modal">
            <div className="obie-form">
              <form method="post" name="obie-form">
                <h3>Get an Instant Insurance Quote</h3>
                <div className="form-item">
                  <input type="text" id="location" name="obie-property-address" className="obie-property-address" placeholder="Enter property address" required />
                </div>
                <div className="form-item">
                  <input type="email" id="email" name="obie-email" className="obie-email" required placeholder="What's your email?" />
                </div>
                <button id="init-obie-button" type="submit" className="tertiary-button obie-form__button-submit">Get an Instant Quote</button>
              </form>

              <div className="obie-loading obie-loading--dark">
                <div className="lds-dual-ring" />
              </div>
            </div>

          </div>
        </div>
        <script src="https://static.obierisk.com/sdk/obie.js" />
        <script src="https://www.baselane.com/wp-content/themes/baselane-theme/widgets/obie-form/obie-form-autocomplete-init.js" />
        <script src="https://www.baselane.com/wp-content/themes/baselane-theme/widgets/obie-form/obie-form.js" />
        {/* </Modal> */}
      </div>
      <Divider color="primary.100" my="4px" />
    </>
  );
}

SaveOnInsurance.propTypes = {};

export default React.memo(
  SaveOnInsurance,
);
