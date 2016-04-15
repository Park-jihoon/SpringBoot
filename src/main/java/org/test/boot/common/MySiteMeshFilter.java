package org.test.boot.common;

import org.sitemesh.builder.SiteMeshFilterBuilder;
import org.sitemesh.config.ConfigurableSiteMeshFilter;

public class MySiteMeshFilter extends ConfigurableSiteMeshFilter {

	@Override
	protected void applyCustomConfiguration(SiteMeshFilterBuilder builder) {
        //Configuring Decorator Mappings
        builder
                .addExcludedPath("login")
                .addExcludedPath("/common/*")
                .addDecoratorPath("/*", "/WEB-INF/sitemesh/decorator.jsp")
                        //MIME Types
                .setMimeTypes("text/html", "application/xhtml+xml", "application/vnd.wap.xhtml+xml");

	}

}
