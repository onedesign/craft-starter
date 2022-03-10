<?php
/**
 * Storybook plugin for Craft CMS 3.x
 *
 * Storybook and Craft together at last
 *
 * @link      https://www.onedesigncompany.com/
 * @copyright Copyright (c) 2022 One Design Company
 */

namespace onedesign\storybook\controllers;

use onedesign\storybook\Storybook;

use Craft;
use craft\web\Controller;

/**
 * Components Controller
 *
 * Generally speaking, controllers are the middlemen between the front end of
 * the CP/website and your plugin’s services. They contain action methods which
 * handle individual tasks.
 *
 * A common pattern used throughout Craft involves a controller action gathering
 * post data, saving it on a model, passing the model off to a service, and then
 * responding to the request appropriately depending on the service method’s response.
 *
 * Action methods begin with the prefix “action”, followed by a description of what
 * the method does (for example, actionSaveIngredient()).
 *
 * https://craftcms.com/docs/plugins/controllers
 *
 * @author    One Design Company
 * @package   Storybook
 * @since     1.0.0
 */
class ComponentsController extends Controller
{

    // Protected Properties
    // =========================================================================

    /**
     * @var    bool|array Allows anonymous access to this controller's actions.
     *         The actions must be in 'kebab-case'
     * @access protected
     */
    protected $allowAnonymous = ['index', 'do-something'];

    // Public Methods
    // =========================================================================

    /**
     * Handle a request going to our plugin's index action URL,
     * e.g.: actions/storybook/components
     *
     * @return mixed
     */
    public function actionIndex()
    {
        $result = 'Welcome to the ComponentsController actionIndex() method';

        return $result;
    }

    /**
     * Handle a request going to our plugin's actionDoSomething URL,
     * e.g.: actions/storybook/components/do-something
     *
     * @return mixed
     */
    public function actionDoSomething()
    {
        $result = 'Welcome to the ComponentsController actionDoSomething() method';

        return $result;
    }
}
