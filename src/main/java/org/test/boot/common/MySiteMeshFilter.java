package org.test.boot.common;

import org.sitemesh.builder.SiteMeshFilterBuilder;
import org.sitemesh.config.ConfigurableSiteMeshFilter;

public class MySiteMeshFilter extends ConfigurableSiteMeshFilter {

	@Override
	protected void applyCustomConfiguration(SiteMeshFilterBuilder builder) {
        //Configuring Decorator Mappings
		builder.addDecoratorPath("/*", "/WEB-INF/sitemesh/decorator.jsp");

        //MIME Types
        builder.setMimeTypes("text/html", "application/xhtml+xml", "application/vnd.wap.xhtml+xml");
	}

}
