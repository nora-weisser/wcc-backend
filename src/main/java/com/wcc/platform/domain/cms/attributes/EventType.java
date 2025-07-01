package com.wcc.platform.domain.cms.attributes;

import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Locale;

/** Available event types. */
public enum EventType {
  IN_PERSON,
  ONLINE_MEETUP,
  HYBRID;

  @JsonValue
  @Override
  public String toString() {
    return name().toLowerCase(Locale.ENGLISH);
  }
}
