package com.wcc.platform.domain.cms.attributes;

import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Locale;

/** Allowed image types formats to be shown in the frontend. */
public enum ImageType {
  MOBILE,
  DESKTOP,
  TABLET;

  @JsonValue
  @Override
  public String toString() {
    return name().toLowerCase(Locale.ENGLISH);
  }
}
