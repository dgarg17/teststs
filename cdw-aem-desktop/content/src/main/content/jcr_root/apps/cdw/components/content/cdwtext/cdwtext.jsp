
<%@page session="false"%><%@ page
import="com.day.cq.wcm.foundation.Placeholder" %>
<%--
Rich Text component
--%><%
%><%@include file="/libs/foundation/global.jsp"%>

<link rel="stylesheet" href="/etc/designs/cdw-global/clientlibs/css/main.css" />

<%
%>
<cq:text property="text" escapeXml="true"
	placeholder="<%= Placeholder.getDefaultPlaceholder(slingRequest, component, null)%>" />
