package com.wcc.platform.domain.platform;

import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Locale;

/** All available member types in the community. */
public enum MemberType {
  DIRECTOR,
  LEADER,
  EVANGELIST,
  VOLUNTEER,
  MENTOR,
  MENTEE,
  MEMBER,
  SPEAKER,
  COLLABORATOR,
  PARTNER;

  @JsonValue
  @Override
  public String toString() {
    return name().toLowerCase(Locale.ENGLISH);
  }
}
