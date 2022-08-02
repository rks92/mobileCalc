import {
  Box,
  Divider,
  Flex,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from '../shared/Row';
import { formatInDollars } from '../shared/utilities';
import CurrencyText from '../shared/texts/CurrencyText';
import MonthlyExpensesChart from './MonthlyExpensesChart';

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
  componentDidMount(() => {
  	//TODO: What do these scripts do
  	// <script src="<?php bloginfo('template_url') ?>/widgets/obie-form/obie-form-autocomplete-init.js"></script>
	// <script src="<?php bloginfo('template_url') ?>/widgets/obie-form/obie-form.js"></script>

  	const script = document.createElement("script");
    script.src = "https://static.obierisk.com/sdk/obie.js";
    script.async = true;
    document.body.appendChild(script);

    const gmapsScript = document.createElement("script");
    gmapsScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAPXiZqQFEjY4PEkY8vu22hVCFQppGTW4Q&amp;libraries=places";
    gmapsScript.async = true;
    document.body.appendChild(script);
  }

  useEffect(() => {}
  return (
    <>

      <div class="tabcontent12" id="save-on-insurance" style="display: none;">
		<div class="save-on-insurance">
			<div class="save-on-insurance-text">
				<h3>Landloard Insurance that is right for you</h3>
				<ul>
					<li>Make sure you have the right coverage</li>
					<li>Check if you can save $100's on existing policy</li>
					<li>No phone call or hassle required</li>
				</ul>
				<a id="insurance-content-quote1" href="#insurance-modal-wrap" class="open-popup-link primary-cta-button tertiary-button">Get an Instant Quote</a>
			</div>
			<div class="save-on-insurance-image">
				<img src="https://www.baselane.com/wp-content/uploads/2022/07/Content.png" srcset="https://www.baselane.com/wp-content/uploads/2022/07/Content.png 1x, https://www.baselane.com/wp-content/uploads/2022/07/Content@2x.png 2x" alt="" />
			</div>
		</div>

		<div id="insurance-modal-wrap" class="mfp-hide">
			<div class="insurance-modal">
				<div class="obie-form">
					<form method="post" name="obie-form">
						<h3>Get an Instant Insurance Quote</h3>
						<div class="form-item">
							<input type="text" id="location" name="obie-property-address" class="obie-property-address" placeholder="Enter property address" required />
						</div>
						<div class="form-item">
							<input type="email" id="email" name="obie-email" class="obie-email" required placeholder="What's your email?" />
						</div>
						<button type="submit" class="tertiary-button obie-form__button-submit">Get an Instant Quote</button>
					</form>
				</div>

				<div class="obie-loading obie-loading--dark">
					<div class="lds-dual-ring"></div>
				</div>

				<div class="obie-results hide">
					<div class="obie-form-result">
						<div class="obie-result-box">
							<span class="obie-result-title">Property Insurance Estimate</span>
							<p id="obie-results-value"></p>
							<a href="javascript:;" id="obie-toggle-modal" name="modal-button" class="tertiary-button">Click here to insure your property</a>
							<p id="obie-results-address"></p>
							<img src="https://www.baselane.com/wp-content/uploads/2021/12/Logo-Badge-White-BG.svg" class="powered-by-obie" height="32" alt="Powered by Obie">
						</div>
					</div>
				</div>
			</div>
		</div>

		<script type="text/javascript">
			$(document).ready(function() {

				$(".insurance-popup-link").magnificPopup({
					type: "inline",
					midClick: true,
					callbacks: {
						open: function() {
							Obie.init({
								<?php if (wp_get_environment_type() === 'production') : ?>
									partnerId: "69214a56-7199-48a2-861d-27518409407c",
									sandbox: false
								<?php else : ?>
									partnerId: "3c9219c8-31d0-43e3-91b5-a871758f1f94",
									sandbox: true
								<?php endif ?>
							});
							initializeAutocomplete(
						},
					},
				});

				// <?php if (is_page($insuranceTargetPageIDs)) : ?>
				// 	initializeAutocomplete();

				// 	$(".obie-form").submit(function(e) {
				// 		analytics.track("lp_lead", {
				// 			email: $(".obie-email").val(),
				// 			sfdc_Lead_Source: "LP_Insurance",
				// 		}, {
				// 			integrations: {
				// 				'Salesforce': true
				// 			}
				// 		});
				// 	});
				// <?php endif ?>
			});
		</script>

	</div>
      <SimpleGrid rows={8} spacing="10px" mt={5}>
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
      </SimpleGrid>
      <Divider color="primary.100" my="4px" />
      <Flex flexDirection="row" flexWrap="nowrap" alignContent="center" justifyContent="flex-end" alignItems="center">
        <Text fontSize="xs" fontWeight="medium" color="neutral.900">{'Total Monthly Expenses  = '}</Text>
        <CurrencyText ml={1} fontSize="lg" value={totalMonthlyExpenses} />
      </Flex>
    </>
  );
}

SaveOnInsurance.propTypes = {};

export default React.memo(
  SaveOnInsurance,
  (prevProps, nextProps) => (),
);
