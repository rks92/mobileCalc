import {
  Box,
  Divider,
  Flex,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, {
  useEffect, useState, componentDidMount, ReactDOM,
} from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
// import { Popup, MagnificPopup } from 'react-magnific-popup';
import Row from '../shared/Row';
import { formatInDollars } from '../shared/utilities';
import CurrencyText from '../shared/texts/CurrencyText';
import MonthlyExpensesChart from './MonthlyExpensesChart';
import './SaveOnInsuranceStyles.css';

const Color = React.memo(
  ({ color }) => <Box bg={color} h="12px" w="12px" borderRadius="50%" />,
  (prevProps, nextProps) => prevProps.color === nextProps.color,
);

Color.propTypes = { color: PropTypes.string.isRequired };

const Label = React.memo(
  ({ text }) => <Text fontSize="sm" fontWeight="medium" color="neutral.900" ml={2}>{text}</Text>,
  (prevProps, nextProps) => prevProps.text === nextProps.text,
);

Label.propTypes = { text: PropTypes.string.isRequired };

const Value = React.memo(
  ({ value }) => <Text fontSize="sm" fontWeight="medium" color="neutral.600">{formatInDollars(value)}</Text>,
  (prevProps, nextProps) => prevProps.value === nextProps.value,
);

Value.propTypes = { value: PropTypes.number.isRequired };

const obieModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

/*
Questions:
- What does initializeAutoComplete do?

*/

// Modal.setAppElement('#insurance-modal-wrap');

function SaveOnInsurance({}) {
  // componentDidMount(() => {
  	// TODO: What do these scripts do
  	// <script src="<?php bloginfo('template_url') ?>/widgets/obie-form/obie-form-autocomplete-init.js"></script>
  // <script src="<?php bloginfo('template_url') ?>/widgets/obie-form/obie-form.js"></script>
  // });
  const jquery = document.createElement('script');
  jquery.src = 'https://code.jquery.com/jquery-3.6.0.slim.min.js';
  jquery.async = false;
  document.body.appendChild(jquery);

  const obieScript = document.createElement('script');
  obieScript.src = 'https://static.obierisk.com/sdk/obie.js';
  obieScript.async = true;
  document.body.appendChild(obieScript);

  // const gmapsScript = document.createElement('script');
  // gmapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAPXiZqQFEjY4PEkY8vu22hVCFQppGTW4Q&amp;libraries=places';
  // gmapsScript.async = true;
  // document.body.appendChild(gmapsScript);

  // const magnificPopupScript = document.createElement('script');
  // magnificPopupScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.js';
  // magnificPopupScript.async = true;
  // document.body.appendChild(magnificPopupScript);
  //
  // const magnificPopupStyle = document.createElement('style');
  // magnificPopupStyle.src = 'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.css';
  // magnificPopupStyle.async = true;
  // document.body.appendChild(magnificPopupStyle);

  // MagnificPopup.trigger('.mfp-hide', 'open');

  // useEffect(() => {})

  // const magnificScr = "$(\".insurance-popup-link\").magnificPopup({\
  // 	type: \"inline\",\
  // 	midClick: true,\
  // 	callbacks: {\
  // 		open: function() {\
  // 			Obie.init({\
  // 			    partnerId: \"69214a56-7199-48a2-861d-27518409407c\",\
  // 			    sandbox: false\
  // 			});\
  // 			initializeAutocomplete();\
  // 		},\
  // 	},\
  // });"

  // const magnificInputScript = document.createElement("script");
  // magnificInputScript.src = magnificScr;
  // magnificInputScript.async = true;
  // document.body.appendChild(magnificInputScript);

  const formConfig = {
    type: 'inline',
    preloader: false,
    focus: '#location',
  };

  const [obieInitModalIsOpen, setObieInitModalIsOpen] = React.useState(false);

  function openObieInitModal() {
    setObieInitModalIsOpen(true);
    console.log(window.Obie);
    window.Obie.init({
      partnerId: '69214a56-7199-48a2-861d-27518409407c',
      sandbox: false,
    });
  }

  function afterOpenObieInitModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
    // window.Obie.init({
    //
    // })
  }

  function closeObieInitModal() {
    setObieInitModalIsOpen(false);
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
            <button id="insurance-content-quote1" onClick={openObieInitModal} className="open-popup-link primary-cta-button tertiary-button">Get an Instant Quote</button>
          </div>
          <div className="save-on-insurance-image">
            <img src="https://www.baselane.com/wp-content/uploads/2022/07/Content.png" srcSet="https://www.baselane.com/wp-content/uploads/2022/07/Content.png 1x, https://www.baselane.com/wp-content/uploads/2022/07/Content@2x.png 2x" alt="" />

          </div>
        </div>

        <Modal
          isOpen={obieInitModalIsOpen}
          onAfterOpen={afterOpenObieInitModal}
          onRequestClose={closeObieInitModal}
          style={obieModalStyles}
          contentLabel="Save on Insurance"
        >
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
                  <button type="submit" className="open-popup-link primary-cta-button tertiary-button obie-form__button-submit">Get an Instant Quote</button>
                </form>
              </div>

              <div className="obie-loading obie-loading--dark">
                <div className="lds-dual-ring" />
              </div>

            </div>
          </div>
        </Modal>
        <Modal>
          <div className="obie-results hide">
            <div className="obie-form-result">
              <div className="obie-result-box">
                <span className="obie-result-title">Property Insurance Estimate</span>
                <p id="obie-results-value" />
                <a javascript="href:;" id="obie-toggle-modal" name="modal-button" className="tertiary-button">Click here to insure your property</a>
                <p id="obie-results-address" />
                <img
                  src="https://www.baselane.com/wp-content/uploads/2021/12/Logo-Badge-White-BG.svg"
                  className="powered-by-obie"
                  height="32"
                  alt="Powered by Obie"
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
      {/* <SimpleGrid rows={8} spacing="10px" mt={5}>
        {
          expenses.map((expense) => (
            <Row key={expense.text.replaceAll(' ', '_')}>
              <Color color={expense.color} />
              <Label text={expense.text} />
              <Spacer />
              <Value value={expense.value} />
            </Row>
          ))
        }
      </SimpleGrid> */}
      <Divider color="primary.100" my="4px" />
      {/* <Flex flexDirection="row" flexWrap="nowrap" alignContent="center" justifyContent="flex-end" alignItems="center">
        <Text fontSize="xs" fontWeight="medium" color="neutral.900">{'Total Monthly Expenses  = '}</Text>
        <CurrencyText ml={1} fontSize="lg" value={totalMonthlyExpenses} />
      </Flex> */}
    </>
  );
}

SaveOnInsurance.propTypes = {};

export default React.memo(
  SaveOnInsurance,
);
