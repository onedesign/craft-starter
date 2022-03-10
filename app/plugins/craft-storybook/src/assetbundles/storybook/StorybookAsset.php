<?php
/**
 * Storybook plugin for Craft CMS 3.x
 *
 * Storybook and Craft together at last
 *
 * @link      https://www.onedesigncompany.com/
 * @copyright Copyright (c) 2022 One Design Company
 */

namespace onedesign\storybook\assetbundles\storybook;

use Craft;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

/**
 * StorybookAsset AssetBundle
 *
 * AssetBundle represents a collection of asset files, such as CSS, JS, images.
 *
 * Each asset bundle has a unique name that globally identifies it among all asset bundles used in an application.
 * The name is the [fully qualified class name](http://php.net/manual/en/language.namespaces.rules.php)
 * of the class representing it.
 *
 * An asset bundle can depend on other asset bundles. When registering an asset bundle
 * with a view, all its dependent asset bundles will be automatically registered.
 *
 * http://www.yiiframework.com/doc-2.0/guide-structure-assets.html
 *
 * @author    One Design Company
 * @package   Storybook
 * @since     1.0.0
 */
class StorybookAsset extends AssetBundle
{
    // Public Methods
    // =========================================================================

    /**
     * Initializes the bundle.
     */
    public function init()
    {
        // define the path that your publishable resources live
        $this->sourcePath = "@onedesign/storybook/assetbundles/storybook/dist";

        // define the dependencies
        $this->depends = [
            CpAsset::class,
        ];

        // define the relative path to CSS/JS files that should be registered with the page
        // when this asset bundle is registered
        $this->js = [
            'js/Storybook.js',
        ];

        $this->css = [
            'css/Storybook.css',
        ];

        parent::init();
    }
}
