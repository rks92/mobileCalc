import {
  Box,
  Divider,
  Flex,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState, componentDidMount } from 'react';
import PropTypes from 'prop-types';
import Row from '../shared/Row';
import { formatInDollars } from '../shared/utilities';
import CurrencyText from '../shared/texts/CurrencyText';
import MonthlyExpensesChart from './MonthlyExpensesChart';
// import { MagnificPopup } from 'react-magnific-popup';
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

/*
Questions:
- What does initializeAutoComplete do?

*/

function SaveOnInsurance({}) {
  // componentDidMount(() => {
  	//TODO: What do these scripts do
  	// <script src="<?php bloginfo('template_url') ?>/widgets/obie-form/obie-form-autocomplete-init.js"></script>
	// <script src="<?php bloginfo('template_url') ?>/widgets/obie-form/obie-form.js"></script>
  // });
  const script = document.createElement("script");
  script.src = "https://static.obierisk.com/sdk/obie.js";
  script.async = true;
  document.body.appendChild(script);

  const gmapsScript = document.createElement("script");
  gmapsScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAPXiZqQFEjY4PEkY8vu22hVCFQppGTW4Q&amp;libraries=places";
  gmapsScript.async = true;
  document.body.appendChild(script);

  // useEffect(() => {})
  return (
    <>
      <div className="tabcontent12" id="save-on-insurance">
		<div className="save-on-insurance">
			<div className="save-on-insurance-text">
				<h3>Landloard Insurance that is right for you</h3>
				<ul>
					<li>Make sure you have the right coverage</li>
					<li>Check if you can save $100's on existing policy</li>
					<li>No phone call or hassle required</li>
				</ul>
				<a id="insurance-content-quote1" href="#insurance-modal-wrap" className="open-popup-link primary-cta-button tertiary-button">Get an Instant Quote</a>
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
						<button type="submit" className="tertiary-button obie-form__button-submit">Get an Instant Quote</button>
					</form>
				</div>

				<div className="obie-loading obie-loading--dark">
					<div className="lds-dual-ring"></div>
				</div>

				<div className="obie-results hide">
					<div className="obie-form-result">
						<div className="obie-result-box">
							<span className="obie-result-title">Property Insurance Estimate</span>
							<p id="obie-results-value"></p>
							<a javascript="href:;" id="obie-toggle-modal" name="modal-button" className="tertiary-button">Click here to insure your property</a>
							<p id="obie-results-address"></p>
							<img 
								src="https://www.baselane.com/wp-content/uploads/2021/12/Logo-Badge-White-BG.svg" 
								className="powered-by-obie" 
								height="32" alt="Powered by Obie">
							</img>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
      {/*<SimpleGrid rows={8} spacing="10px" mt={5}>
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
      </SimpleGrid>*/}
      <Divider color="primary.100" my="4px" />
      {/*<Flex flexDirection="row" flexWrap="nowrap" alignContent="center" justifyContent="flex-end" alignItems="center">
        <Text fontSize="xs" fontWeight="medium" color="neutral.900">{'Total Monthly Expenses  = '}</Text>
        <CurrencyText ml={1} fontSize="lg" value={totalMonthlyExpenses} />
      </Flex>*/}
    </>
  );
}

SaveOnInsurance.propTypes = {};

export default React.memo(
  SaveOnInsurance
);
